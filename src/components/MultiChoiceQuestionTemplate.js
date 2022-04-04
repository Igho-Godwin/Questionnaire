import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";

const MultiChoiceQuestionTemplate = ({
  label,
  identifier,
  value,
  index,
  checked,
  handleChange,
}) => (
  <Grid item lg={6} xs={12} data-testid={identifier}>
    <FormGroup className="form-group">
      <label className="container_check version_2">
        {label}
        <input
          data-testid={"choice" + index}
          type="checkbox"
          name={identifier + "[]"}
          value={value}
          onChange={() => handleChange({ choiceIndex: index })}
          checked={checked}
        />
        <span className="checkmark"></span>
      </label>
    </FormGroup>
  </Grid>
);

export default MultiChoiceQuestionTemplate;
