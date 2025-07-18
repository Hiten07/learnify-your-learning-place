type Lesson = {
  title: string;
  description: string;
  video: FileList;
  pdf?: FileList;
};

type Module = {
  title: string;
  description: string;
  lessons: Lesson[];
};

export type CourseForm = {
  title: string;
  price: number;
  duration: number;
  description: string;
  modules: Module[];
};