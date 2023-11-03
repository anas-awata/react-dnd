import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "./scroll.css";
import { Droppable } from "react-beautiful-dnd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 800px;
  height: 300px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <Accordion>
      <AccordionSummary>
        <Title
          style={{
            backgroundColor: "lightblue",
            position: "stick",
          }}
        >
          {title}
        </Title>
      </AccordionSummary>
      <AccordionDetails>
        <Container className="column">
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task key={index} index={index} task={task} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
}
