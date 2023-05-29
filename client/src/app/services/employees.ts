import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmpoyees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    getEmpoyee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    editEmpoyee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),
    removeEmpoyee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addEmpoyee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/add`,
        method: "POST",
        body: employee,
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
