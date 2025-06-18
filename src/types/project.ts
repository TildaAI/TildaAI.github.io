export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'Machine Learning' | 'Computer Vision' | 'NLP' | 'Robotics' | 'Data Science' | 'Healthcare AI' | 'Fintech AI' | 'Gaming AI';
  teamSize: number;
  stage: 'Prototype' | 'Alpha' | 'Beta' | 'Production';
  votes: number;
  fundingGoal: string;
  logo: string;
  image: string;
}