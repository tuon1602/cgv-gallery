import z from "zod"
export const createUserSchema = z.object({
    name: z
      .string({ required_error: "Bạn phải nhập tên" })
      .min(3, { message: "Tối thiểu 3 kí tự" }),
    password: z
      .string({ required_error: "Phải nhập mật khẩu" })
      .min(3, { message: "Tối thiểu 3 kí tự" }),
    userId: z
      .string({ required_error: "Phải nhập mã nhân viên" })
      .min(6, { message: "Id nhân viên 6 kí tự" }),
    role: z.string({
      required_error: "Please select an email to display.",
    }),
    avatarUrl: z.string({ required_error: "Bạn phải tải ảnh" }),
  });

export const userLoginSchema = z.object({
  userId: z.string().min(6, {
    message: "UserId must be 6 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});