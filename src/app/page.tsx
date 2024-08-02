'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../../storage';
import Scrollbar from '@/components/scrollbar';
import { SiTelegram, SiYoutube, SiGithub } from "react-icons/si";
import { LampContainer } from "@/components/ui/lamp";

const Navbar = () => (
  <nav className="bg-gray-800 p-4 sticky top-0 z-10 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">30 Days of Projects</h1>
      <div className="space-x-6 flex">
        <Link href="https://www.youtube.com/@Kr30x" className="hover:text-gray-300">
          <SiYoutube size={24} />
        </Link>
        <Link href="https://github.com/Kr30x" className="hover:text-gray-300">
          <SiGithub size={24} />
        </Link>
        <Link href="https://t.me/g_golubev" className="hover:text-gray-300">
          <SiTelegram size={24} />
        </Link>
      </div>
    </div>
  </nav>
);

const LampEffect = () => (
  <LampContainer>
    <motion.h1
      initial={{ opacity: 0.5, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
      30 Days of Coding
    </motion.h1>
  </LampContainer>
);

const ProjectCard = ({ project, index, onClick }) => (
  <motion.div 
    className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl shadow-black/20 cursor-pointer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.2  + 2}}
    whileHover={{ transform: 'translateY(-5px)' }}
    onClick={() => onClick(project)}
  >
    <img
      src={project.screenshotPath}
      alt={`${project.name} preview`}
      className="w-full h-64 object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
    </div>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', damping: 15 }}
      className="bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full flex shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-1/2 p-8">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4"
        >
          {project.name}
        </motion.h2>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 mb-6"
        >
          {project.big_description}
        </motion.p>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold mb-2">Links:</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(project.links).map(([linkName, url]) => (
              <motion.a
                key={linkName}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-dashed border-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {linkName}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="w-1/2">
        <img
          src={project.screenshotPath}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  </motion.div>
);

const ShowcasePage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Scrollbar />
      <main className="flex-grow">
        <LampEffect />
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            {projects.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    onClick={handleProjectClick}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p 
                className="text-center text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                No projects to display. Add your first masterpiece!
              </motion.p>
            )}
          </div>
        </section>
        <section>
          <div className="h-[50vh]">
          </div>
        </section>
      </main>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowcasePage;