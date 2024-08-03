const STORAGE_KEY = 'showcase_projects';

const defaultProjects = [
  {
    id: 1,
    name: "Custom form with Notion integration",
    description: "Beautiful custom form built with react",
    big_description: "In this project I created a form, which is connected to Notion Database, where I can store my data. I used React and Next.js as a framework, and Express for the backend. I also used Notion API to store my data.",
    screenshotPath: "/images/project1.png",
    links: {'GitHub': "https://github.com/Kr30x/react-form-to-notion", 'Live Demo': "https://kr30x-suggestion-form.vercel.app/"}
  },
  {
    id: 2,
    name: "Showcase for my projects",
    description: "Neat showcase built with shadcn and aceternity ui",
    big_description: "In this project I created a showcase where I store all my projects during this challenge. I used React and Next.js as a framework.",
    screenshotPath: "/images/project2.png",
    links: {'GitHub': "https://github.com/Kr30x/project-showcase", 'Live Demo': "https://kr30x-projects.vercel.app/"}
  },
  {
    id: 3,
    name: "Multiplayer tic tac toe",
    description: "Tic tac toe game with multiplayer",
    big_description: "In this project I created a tic tac toe game with multiplayer. I used React and Next.js as a framework, and Express for the backend.",
    screenshotPath: "/images/project3.png",
    links: {'GitHub': "https://github.com/Kr30x/tictactoe-online", 'Live Demo': "https://kr30xs-tictactoe-online.vercel.app/"}
  }
];

export const getProjects = () => {
  if (typeof window === 'undefined') {
    return defaultProjects;
  }
  
  const storedProjects = localStorage.getItem(STORAGE_KEY);
  return storedProjects ? JSON.parse(storedProjects) : defaultProjects;
};

export const saveProjects = (projects) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};

export const addProject = (project) => {
  const projects = getProjects();
  const newProject = { ...project, id: Date.now() };
  const updatedProjects = [...projects, newProject];
  saveProjects(updatedProjects);
  return updatedProjects;
};

export const updateProject = (updatedProject) => {
  const projects = getProjects();
  const updatedProjects = projects.map(project => 
    project.id === updatedProject.id ? updatedProject : project
  );
  saveProjects(updatedProjects);
  return updatedProjects;
};

export const deleteProject = (projectId) => {
  const projects = getProjects();
  const updatedProjects = projects.filter(project => project.id !== projectId);
  saveProjects(updatedProjects);
  return updatedProjects;
};