import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { IconButton, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default function Task({ task, index }) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: task,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    // apiRef.current.updateRows([data]);
    // apiRef.current.toggleDetailPanel(row.id);
    console.log(data);
  };

  const [fileState, setFileState] = useState(false);
  const [expande, setExpande] = useState(false);
  return (
    <Draggable
      draggableId={`${task.id}`}
      key={task.id}
      index={index}
      style={{ margin: 0 }}
    >
      {(provided) => (
        <>
          <Accordion
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            expanded={expande}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <IconButton onClick={() => setExpande(!expande)}>
                    {expande == false ? (
                      <AiOutlinePlusCircle />
                    ) : (
                      <AiOutlineMinusCircle />
                    )}
                  </IconButton>
                  <Typography>
                    #{task.id} {task.title}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                  <Button
                    onClick={(e) => {
                      setExpande(true);
                      setFileState(false);
                    }}
                    color="secondary"
                    variant="contained"
                    sx={{ whiteSpace: "nowrap" }}
                    size="small"
                  >
                    Edit Content
                  </Button>
                  <Button
                    onClick={(e) => {
                      setExpande(true);
                      setFileState(true);
                    }}
                    variant="contained"
                    sx={{ whiteSpace: "nowrap" }}
                    size="small"
                  >
                    Add File
                  </Button>
                </Stack>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
                direction="column"
              >
                <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 3 }}>
                  {!fileState && (
                    <Stack
                      component="form"
                      justifyContent="space-between"
                      gap={3}
                      onSubmit={handleSubmit(onSubmit)}
                      sx={{ height: 1 }}
                    >
                      <Typography variant="h6">{`Edit Order #${task.id}`}</Typography>
                      <Controller
                        control={control}
                        name="title"
                        rules={{ required: true }}
                        render={({ field, fieldState: { invalid } }) => (
                          <TextField
                            label="Customer"
                            size="small"
                            error={invalid}
                            required
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="id"
                        rules={{ required: true }}
                        render={({ field, fieldState: { invalid } }) => (
                          <TextField
                            label="Email"
                            size="small"
                            error={invalid}
                            required
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                      <div>
                        <Button
                          type="submit"
                          variant="outlined"
                          size="small"
                          disabled={!isValid}
                        >
                          Save
                        </Button>
                      </div>
                    </Stack>
                  )}
                  {fileState && (
                    <Stack direction="row" justifyContent="space-around">
                      <Button variant="contained">Video</Button>
                      <Button variant="contained">Audio</Button>
                      <Button variant="contained">Asset</Button>
                      <Button variant="contained">Test</Button>
                    </Stack>
                  )}
                </Paper>
              </Stack>
            </AccordionDetails>
            {provided.placeholder}
          </Accordion>
        </>
      )}
    </Draggable>
  );
}
