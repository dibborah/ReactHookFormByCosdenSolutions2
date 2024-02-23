// Create a Simple Form in React
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormFields = z.infer<typeof schema>

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: {
      email: "demo@email.com",
    },
    resolver: zodResolver(schema)// resolvers are very important to put
  });

  // r-h-f makes handling asynchronous fcs really really simple
  // isSubmitting => a boolean values which becomes true when the form is submitting

  //SubmitHandler is from r-h-f
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {// To handle asynchronous Error (BE) which doesnot necessarily belongs to an input
        message: "This email is already taken"
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          // Now the input field || fields are registered with the react-hook-form and email useState and so  will be controlled by r-h-f
          {...register("email")}
          type="text"
          placeholder="Enter Email"
        />
        {errors.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <input
          {...register("password")}// Now what ever input we type will be directly sent to r-h-f to manage the inputs along with the password useState
          type="password"
          placeholder="Enter Password"
        />
        {errors.password && <div style={{ color: "red" }}>{errors.password.message}</div>}
      </div>
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && (
        <div style={{ color: "red" }}>{errors.root.message}</div>
      )}
    </form>
  )
}

export default App;