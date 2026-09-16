export interface Story {
  id: string;
  date: string;
  time: string;
  account: string;
  title: string;
  subjects: string[];
  image: string;
  frame: number;
}

export interface StoryData {
  account: string;
  subjectLabels: Record<string, string>;
  stories: Story[];
}
