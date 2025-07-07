import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const key = "auth"

  const getMe = () => useQuery({
    queryKey: [key],
    queryFn: () => api.get("auth/me").then((res) => res.data),
    retry: false
  });

  const login = useMutation({
    mutationFn: (body: any) => api.post("auth/login", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
    retry: 1
  });

  return { login, getMe };
};
