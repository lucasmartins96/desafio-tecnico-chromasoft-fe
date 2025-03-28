import axiosInstance from './axios';
import { Task } from './interfaces';

export async function updateTaskFetcher(
  key: string,
  {
    arg: { token, ...body },
  }: {
    arg: {
      id?: number;
      title?: string;
      description?: string;
      status?: 'PENDING' | 'DONE';
      token: string | null;
    };
  }
) {
  return await axiosInstance
    .patch(key, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}

export async function deleteTaskFetcher(
  key: string,
  { arg }: { arg: { id: number; token: string | null } }
) {
  return await axiosInstance
    .delete(key, {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
      data: {
        id: arg.id,
      },
    })
    .then((res) => res.data);
}

export async function fetcherAllTasks(key: string, token?: string | null) {
  return await axiosInstance
    .get(key, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as { tasks: Task[] });
}

export async function fetcherMutationAllTasks(
  key: string,
  {
    arg,
  }: {
    arg: string;
  }
) {
  return await axiosInstance
    .get(key, {
      headers: {
        Authorization: `Bearer ${arg}`,
      },
    })
    .then((res) => res.data as { tasks: Task[] });
}

export async function addTaskStatusFetcher(
  key: string,
  {
    arg: { token, ...body },
  }: {
    arg: {
      title: string;
      description: string;
      status: 'PENDING' | 'DONE';
      token: string | null;
    };
  }
) {
  return await axiosInstance
    .post(key, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
