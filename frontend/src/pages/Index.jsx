import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Circle, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTask } from "@/context/TaskContext";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
});

export default function Index() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logout } = useAuth();
  const {
    tasks,
    taskCounts,
    filteredTasks,
    isLoading,
    addTask,
    toggleTaskStatus,
    deleteTask,
    filter,
    setFilter,
    setSearchQuery,
  } = useTask();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await addTask(values);
      form.reset();
    } catch (error) {
      form.setError("root", {
        message: error.message || "Failed to add task. Please try again.",
      });
      console.error("Failed to add task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-between items-center">
            <div>Task Manager</div>
            <div className="flex items-center gap-2">
              Hi, {user.name}
              <Button onClick={() => logout()}>Logout</Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
            {form.formState.errors.root && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding Task
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 md:items-center justify-between flex-col md:flex-row">
            <span>Your Tasks</span>
            <div className="flex items-center">
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All ({taskCounts.total})
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                >
                  Completed ({taskCounts.completed})
                </Button>
                <Button
                  variant={filter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("pending")}
                >
                  Pending ({taskCounts.pending})
                </Button>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Input
                placeholder="Search tasks..."
                className="md:max-w-xs"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {tasks.length === 0
                ? "No tasks yet. Add your first task above."
                : "No tasks match your current filters."}
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-0.5 h-5 w-5"
                      onClick={() => toggleTaskStatus(task.id, task.completed)}
                    >
                      <></>
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                      <span className="sr-only">
                        Mark as {task.completed ? "incomplete" : "complete"}
                      </span>
                    </Button>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          className={`text-sm mt-1 ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={task.completed ? "outline" : "secondary"}
                      className="ml-2"
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete task</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Task</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this task? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-white hover:bg-destructive/90"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
