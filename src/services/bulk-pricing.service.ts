import api from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export interface BulkPricingMatrix {
  categoryId: string;
  brandId: string;
  cityId: string;
  percentage: number;
}

export interface BulkPricingRequest {
  categoryId: string;
  brandId: string;
  cityId: string;
  percentage: number;
}

export const bulkPricingService = {
  getMatrix: async (categoryId: string, brandId: string): Promise<BulkPricingMatrix[]> => {
    const response = await api.get<BulkPricingMatrix[]>(
      `${endpoints.admin.base}/bulk-pricing`,
      { params: { categoryId, brandId } }
    );
    return response.data;
  },

  updateMatrix: async (data: BulkPricingRequest): Promise<BulkPricingMatrix> => {
    const response = await api.put<BulkPricingMatrix>(
      `${endpoints.admin.base}/bulk-pricing`,
      data
    );
    return response.data;
  },
};
