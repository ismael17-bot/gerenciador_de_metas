import fastify from "fastify" ;
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionGoalRoute } from "./routes/create-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goal";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import { fastifyCors } from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createCompletionGoalRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.listen({
    port: 3333,
}).then(() => {
    console.log("http server rudnning!!!")
});