import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../lib/axiosClient";
import { toast } from "sonner";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update task status");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (values) => {
    try {
      const newTask = await axiosClient.post("/tasks", {
        title: values.title,
        description: values.description || "",
      });
      setTasks((prevTasks) => [newTask.data.task, ...prevTasks]);
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  };

  const toggleTaskStatus = async (id, completed) => {
    try {
      const updatedTaskResponse = await axiosClient.patch(`/tasks/${id}`, {
        completed: !completed,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? updatedTaskResponse.data.task : task
        )
      );
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update task status");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosClient.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete task");
      }
    }
  };

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        // Apply completion status filter
        if (filter === "completed" && !task.completed) return false;
        if (filter === "pending" && task.completed) return false;

        // Apply search query filter (case insensitive)
        if (
          searchQuery &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      }),
    [tasks, filter, searchQuery]
  );

  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskCounts,
        filteredTasks,
        isLoading,
        filter,
        setFilter,
        setSearchQuery,
        toggleTaskStatus,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
