import { apiFetch } from '@/lib/api/client';

export interface CityDto {
  cityId: string;
  cityName: string;
  stateName: string;
  isPopular: boolean;
  isCodAvailable: boolean;
  isExchangeAvailable: boolean;
}

export interface PartnerProfile {
  id: string;
  userId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  alternatePhone?: string;
  address?: string;
  operatingCities: CityDto[];
  isActive: boolean;
  createdAt: string;
}

export interface CreatePartnerRequest {
  businessName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  alternatePhone?: string;
  address?: string;
  password?: string;
  operatingCityIds: string[];
}

export const partnerService = {
  getAll: () => apiFetch<PartnerProfile[]>('/api/admin/partners'),
  
  getById: (id: string) => apiFetch<PartnerProfile>(`/api/admin/partners/${id}`),
  
  create: (data: CreatePartnerRequest) => 
    apiFetch<PartnerProfile>('/api/admin/partners', {
      method: 'POST',
      body: data,
    }),
    
  update: (id: string, data: CreatePartnerRequest) =>
    apiFetch<PartnerProfile>(`/api/admin/partners/${id}`, {
      method: 'PUT',
      body: data,
    }),
    
  delete: (id: string) =>
    apiFetch<void>(`/api/admin/partners/${id}`, {
      method: 'DELETE',
    }),
};
