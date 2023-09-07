<template>
  <FormulateForm
    v-model="data"
    :keep-model-data="true"
    @submit="downloadFile"
    #default="{ hasErrors }"
    invalid-message="Not all fields were filled out properly."
  >
    <p class="text-muted">
      This generator will create two starter files, a static version with the
      top level and another dynamic Handlebars version for Visual Editor.
    </p>

    <p class="text-muted mb-4">* required fields</p>

    <div class="row mb-3">
      <div class="col-md-4 border-right">
        <FormulateInput
          name="module_id"
          type="text"
          label="Module Id *"
          value=""
          placeholder="e.g. MBV-003"
          help="No spaces or symbols except for dashes."
          validation="bail|required:trim|matches:/^\S*$/"
          :validation-messages="{
            matches: 'No spaces or symbols except for dashes.',
          }"
          validation-name="Module Id"
          onkeyup="this.value = this.value.toUpperCase();"
        />

        <FormulateInput
          name="module_name"
          type="text"
          label="Module Name *"
          value=""
          placeholder="e.g. 50% Image | 50% Text + CTA"
          validation="required:trim"
          validation-name="Module Name"
        />

        <FormulateInput
          name="custom_css"
          type="checkbox"
          label="Is there custom css?"
        />
      </div>

      <div class="col-md-4">
        <FormulateInput
          name="column_num"
          label="Number of Columns"
          type="select"
          class="col-md-12"
          :options="{
            1: 'One Column',
            2: 'Two Columns',
            3: 'Three Columns',
            4: 'Four Columns',
          }"
          value="1"
        />

        <FormulateInput type="group" name="elementRows">
          <div class="col-md-12">
            <h6 class="mb-0">Number of elements</h6>
            <p class="text-muted">
              Wraps <code>tr</code> around each element to stop ghost lines
            </p>
            <div class="row" style="margin-left: 0px;">
              <FormulateInput
                name="col1"
                label="Col 1"
                class="col num-of-cols"
                type="number"
                validation="min:1"
                value="1"
              />
              <FormulateInput
                v-if="data.column_num > 1"
                name="col2"
                label="Col 2"
                class="col num-of-cols"
                type="number"
                validation="min:1"
                value="1"
              />
              <FormulateInput
                v-if="data.column_num > 2"
                name="col3"
                label="Col 3"
                class="col num-of-cols"
                type="number"
                validation="min:1"
                value="1"
              />
              <FormulateInput
                v-if="data.column_num > 3"
                name="col4"
                label="Col 4"
                class="col num-of-cols"
                type="number"
                validation="min:1"
                value="1"
              />
            </div>
          </div>
        </FormulateInput>

        <div class="col-md-12">
          <h5 class="mb-3">
            Right Rail Field Options
          </h5>

          <FormulateInput
            name="side_margins"
            type="checkbox"
            label="Ability to show/hide side margins"
          />

          <FormulateInput
            name="gutter"
            type="checkbox"
            label="Gutter(s) between columns"
            v-if="data.column_num != 1"
          />

          <FormulateInput
            name="flip"
            type="checkbox"
            label="Abilty to flip columns"
            v-if="data.column_num == 2"
          />
        </div>
      </div>
    </div>

    <hr />
    <FormulateErrors />
    <FormulateInput type="submit" value="Download Boilerplate" />
  </FormulateForm>
</template>

<script>
import { generateLayout } from '../templates/layout.js';

export default {
  name: 'Layout',
  data() {
    return {
      data: {},
    };
  },
  methods: {
    downloadFile() {
      const id = this.data.module_id.toLowerCase().replace('-', '');
      const toplevel_code = generateLayout(this.data, true);
      const hbs_code = generateLayout(this.data);

      const filename_toplevel = `${id}.toplevel.html`;
      const filename_hbs = `${id}.html`;

      // Create link first and make it not visible before append to page so flashing content
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:application/json;charset=utf-8,' +
          encodeURIComponent(toplevel_code)
      );
      element.setAttribute('download', filename_toplevel);
      element.style.display = 'none';
      document.body.appendChild(element);

      //Download 1st file
      element.click();

      // Attach hbs code
      element.setAttribute(
        'href',
        'data:application/json;charset=utf-8,' + encodeURIComponent(hbs_code)
      );
      element.setAttribute('download', filename_hbs);

      //Download 2nd file
      element.click();

      // Delete hidden link
      document.body.removeChild(element);
    },
  },
};
</script>

<style>
.num-of-cols {
  border: 1px dashed red;
  text-align: center;
  padding: 6px;
  margin-bottom: 1.5em !important;
}
</style>
