import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpoyees: builder.query<Employee[], void>({
      query: () => ({
        url: "/emloyees",
        method: "GET",
      }),
    }),
    getEmpoyee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/emloyees/${id}`,
        method: "GET",
      }),
    }),
    editEmpoyee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/emloyees/edit/${employee.id}`,
        method: "PUT",
      }),
    }),
    removeEmpoyee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/emloyees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addEmpoyee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/emloyees/add/`,
        method: "POST",
        body: { employee },
      }),
    }),
  }),
});

export const {
  useGetAllEmpoyeesQuery,
  useGetEmpoyeeQuery,
  useEditEmpoyeeMutation,
  useRemoveEmpoyeeMutation,
  useAddEmpoyeeMutation,
} = employeesApi;

export const {
  endpoints: {
    getAllEmpoyees,
    getEmpoyee,
    editEmpoyee,
    removeEmpoyee,
    addEmpoyee,
  },
} = employeesApi;
