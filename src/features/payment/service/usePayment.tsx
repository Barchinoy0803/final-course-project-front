import { partner, payment } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const usePayment = () => {
  const queryClient = useQueryClient();

  const getPayments = (params: any) =>
    useQuery({
      queryKey: [payment, params],
      queryFn: () => api.get("payment", { params }).then((res) => res.data),
    });

  const createPayment = useMutation({
    mutationFn: (body: any) =>
      api.post("payment", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [payment] });
      queryClient.invalidateQueries({ queryKey: [partner] });
    },
  });

  return { createPayment, getPayments };
};
