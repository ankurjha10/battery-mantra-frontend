import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/feedback/Spinner";
import { CheckCircle2, PhoneCall, Clock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import type { CallbackStatus } from "@/types/dto";

export const Route = createFileRoute("/admin/callbacks")({
  component: AdminCallbacks,
});

function AdminCallbacks() {
  const queryClient = useQueryClient();
  const { data: callbacks, isLoading } = useQuery({
    queryKey: ["admin", "callbacks"],
    queryFn: () => adminService.getAllCallbacks(),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CallbackStatus }) =>
      adminService.updateCallbackStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "callbacks"] });
      toast.success("Callback request marked as resolved!");
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Callback Requests</h1>
          <p className="text-muted-foreground mt-1">Manage user requests for a callback.</p>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : !callbacks || callbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No callback requests found.
                </TableCell>
              </TableRow>
            ) : (
              callbacks.map((c) => (
                <TableRow key={c.callbackId}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-muted-foreground" />
                    {c.mobileNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {format(new Date(c.createdAt), "PPp")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        c.status === "RESOLVED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {c.status === "PENDING" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateStatus.mutate({ id: c.callbackId.toString(), status: "RESOLVED" })
                        }
                        disabled={updateStatus.isPending}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-500" />
                        Mark Resolved
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground pr-2">Completed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
