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
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided) => (
        <>
          <Accordion
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                #{task.id} {task.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
                direction="column"
              >
                <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
                  <Stack
                    component="form"
                    justifyContent="space-between"
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
