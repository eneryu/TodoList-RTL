'use client'

import { useState, useEffect } from 'react'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  category: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: string
  reminder?: string
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }

  const setReminder = (id: string, reminderDate: string) => {
    const task = tasks.find(t => t.id === id)
    if (task && reminderDate) {
      const now = new Date()
      const reminder = new Date(reminderDate)
      if (reminder > now) {
        // إنشاء إشعار
        if ('Notification' in window && Notification.permission === 'granted') {
          const timeDiff = reminder.getTime() - now.getTime()
          setTimeout(() => {
            new Notification('تذكير بالمهمة', {
              body: `حان موعد المهمة: ${task.title}`,
              icon: '/images/logo.svg'
            })
          }, timeDiff)
        }
      }
      editTask(id, { reminder: reminderDate })
    }
  }

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const active = total - completed
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    }
    const byCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const overdue = tasks.filter(t => {
      if (!t.completed && t.dueDate) {
        return new Date(t.dueDate) < new Date()
      }
      return false
    }).length

    return {
      total,
      completed,
      active,
      byPriority,
      byCategory,
      overdue,
      completionRate: total ? Math.round((completed / total) * 100) : 0
    }
  }

  const sortTasks = (tasks: Task[], sortBy: 'dueDate' | 'priority' | 'createdAt') => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      if (sortBy === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 }
        return priorityWeight[b.priority] - priorityWeight[a.priority]
      }
      // createdAt
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setReminder,
    getTaskStats,
    sortTasks
  }
} 