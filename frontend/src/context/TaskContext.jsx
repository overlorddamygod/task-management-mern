import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axiosClient from "../lib/axiosClient";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (values) => {
    await axiosClient.post("/tasks", {
      title: values.title,
      description: values.description || "",
    });
  };

  const toggleTaskStatus = async (id, completed) => {
    await axiosClient.patch(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axiosClient.delete(`/tasks/${id}`);
    fetchTasks();
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
