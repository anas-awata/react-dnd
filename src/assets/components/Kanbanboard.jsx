import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        const first20Items = json.slice(0, 20);
        setCompleted(first20Items.filter((task) => task.completed));
        setIncomplete(first20Items.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!result.destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId == 2) {
        const completedItems = [...completed];
        const [reorderedItem] = completedItems.splice(source.index, 1);
        completedItems.splice(destination.index, 0, {
          ...reorderedItem,
          order: destination.index,
        });
        setCompleted(completedItems);
      } else if (source.droppableId == 1) {
        const incompleteItems = [...incomplete];
        const [reorderedItem] = incompleteItems.splice(source.index, 1);
        incompleteItems.splice(destination.index, 0, {
          ...reorderedItem,
          order: destination.index,
        });
        setIncomplete(incompleteItems);
      }
    } else {
      // GET ITEM
      const task = findItemById(draggableId, [...incomplete, ...completed]);

      //ADD ITEM
      if (destination.droppableId == 2) {
        //delete from the source
        setIncomplete(removeItemById(draggableId, incomplete));
        //add to destination
        const completedItems = [...completed];
        completedItems.splice(destination.index, 0, {
          ...task,
          order: destination.index,
        });
        setCompleted(completedItems);
      } else if (destination.droppableId == 1) {
        setCompleted(removeItemById(draggableId, completed));
        const incompleteItems = [...incomplete];
        incompleteItems.splice(destination.index, 0, {
          ...task,
          order: destination.index,
        });
        setIncomplete(incompleteItems);
      }
    }

    console.log(completed);
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
      </div>
    </DragDropContext>
  );
}
