<template>
  <FormulateForm
    v-model="data"
    @submit="generateCode"
    invalid-message="Not all fields were filled out properly."
  >
    <p class="text-muted">
      This will generate starter code for common elements used. There is a
      static version to use when starting to create your module. The dynamic
      version the same as the static except has the Visual Editor fields and
      Handlebars hooked up. Most likely all you should need to do is update the
      default values in the right rail fields.
    </p>

    <p class="text-muted mb-4">* required fields</p>
    <div class="row">
      <!-- INPUTS -->
      <div class="col border-right">
        <FormulateInput
          name="module_id"
          type="text"
          label="Module Id *"
          value=""
          placeholder="e.g. MBV-003"
          help="Must be same as module id set in layout."
          validation="required:trim"
          validation-name="Module Id"
          onkeyup="this.value = this.value.toUpperCase();"
        />

        <div class="row">
          <FormulateInput
            name="group_id"
            type="text"
            label="Group Id *"
            class="col"
            value=""
            placeholder="e.g. col1_footnote"
            validation="required:trim|matches:/^[A-Za-z0-9_]+\S*$/"
            :validation-messages="{
              matches: 'No spaces or symbols.',
            }"
            validation-name="Group Id"
          />
          <FormulateInput
            name="group_label"
            type="text"
            label="Group Label *"
            class="col"
            value=""
            placeholder="e.g. Left Headline"
            validation="required:trim"
            validation-name="Group Id"
          />
        </div>

        <FormulateInput
          name="is_standard"
          type="checkbox"
          label="Will this be a standard module?"
          v-model="is_standard"
        />

        <FormulateInput
          name="brand_style"
          type="checkbox"
          label="Is this using brand styles?"
          v-model="brand_style"
        />

        <FormulateInput
          name="brand_name_id"
          type="text"
          label="Brand Name Id *"
          help='Specific "name" value of the object under elements array from Brand Style.'
          value=""
          placeholder="e.g. my_headline_normal"
          validation="required:trim"
          validation-name="Brand Name Id"
          v-if="brand_style && !is_standard"
        />
      </div>

      <div class="col">
        <FormulateInput
          name="element"
          label="Element *"
          type="select"
          :options="{
            richtext: 'Rich Text',
            image: 'Image',
            cta: 'CTA',
          }"
          value="richtext"
          placeholder="Select option"
        />

        <!-- RICHTEXT -->
        <section>
          <!-- hack: dropdown won't show tag if selected -->
          <FormulateInput
            v-if="data.element === 'richtext'"
            name="html_tag"
            label="HTML Tag *"
            type="radio"
            class="mb-4"
            :options="{
              h1: 'H1',
              h2: 'H2',
              h3: 'H3',
              h4: 'H4',
              h5: 'H5',
              p: 'Paragraph',
            }"
            value="paragraph"
            placeholder="Select option"
            validation="required"
            validation-name="HTML Tag"
          />

          <FormulateInput
            v-if="data.element === 'richtext'"
            name="is_simple_rte"
            type="checkbox"
            class="mb-4"
            label="No link option in richtext toolbar? Linking will be done in right rail with a different field."
          />

          <!-- <FormulateInput
            name="suppress_btns"
            type="checkbox"
            class="mb-4"
            label="Will some buttons in the toolbar be hidden? For locking down styles for the user."
          /> -->

          <div v-if="data.suppress_btns"></div>

          <!-- IMAGE -->
          <div class="row">
            <FormulateInput
              v-if="data.element == 'image'"
              name="image_width"
              type="number"
              label="Width (px) *"
              value="480"
              placeholder="e.g. 480"
              class="col mb-4"
              validation="required:trim|min:1|max:640"
              validation-name="Image Width"
            />

            <FormulateInput
              v-if="data.element == 'image'"
              name="image_height"
              type="number"
              label="Height (px) *"
              value="300"
              placeholder="e.g. 300"
              class="col mb-4"
              validation="required:trim|min:1"
              validation-name="Image Height"
            />

            <FormulateInput
              v-if="data.element == 'image'"
              name="is_img_static"
              type="checkbox"
              class="col-md-12 mb-4"
              label="Is static image (doesn't autosize to container width)"
              v-model="is_img_static"
            />

            <FormulateInput
              v-if="data.element == 'image' && !is_img_static"
              name="img_col"
              label="How many columns is the layout?"
              type="select"
              :options="{
                1: 'One',
                2: 'Two',
                3: 'Three',
                4: 'Four',
              }"
              class="col-md-12 mb-4"
            />
          </div>

          <FormulateInput
            v-if="data.element == 'cta'"
            name="cta_design_type"
            label="Design Type"
            type="radio"
            class="mb-4"
            :options="{
              square: 'None',
              border: 'Add a Border',
              rounded: 'Add Rounded Corners',
              border_rounded: 'Add Rounded Corners and Border',
              image: 'Make CTA an Image',
              side_images: 'Add Left Right Images',
            }"
            value="no"
            validation="required"
            validation-name="Design Type"
          />

          <FormulateInput
            v-if="data.element == 'cta'"
            name="cta_icon"
            label="Is there an Icon?"
            type="radio"
            class="mb-4"
            :options="{
              none: 'No Icon',
              right: 'Right Icon',
              left: 'Left Icon',
            }"
            validation="required"
            value="no"
          />
        </section>
      </div>
    </div>

    <hr />
    <FormulateErrors />
    <FormulateInput type="submit" value="Generate!" />

    <!-- OUTPUTS -->
    <div
      class="btn-group mb-4 d-flex justify-content-center"
      role="group"
      ref="output"
    >
      <button
        type="button"
        class="btn btn-secondary"
        :class="{ active: version == 'static' }"
        @click="version = 'static'"
      >
        Static
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        :class="{ active: version == 'dynamic' }"
        @click="version = 'dynamic'"
      >
        Dynamic
      </button>
    </div>

    <div id="toggle_dynamic" v-if="version === 'dynamic'">
      <div class="output-col" style="float: left;">
        <h3>Right Rail Fields</h3>

        <pre class="mb-4">
          <Copy selectName="copyField" />
          <div class="output-scroll">
            <code>{{ output.fields }}</code>
            <textarea id="copyField">{{ output.fields }}</textarea>
          </div>
        </pre>
      </div>

      <div class="output-col" style="float: right;">
        <h3>HTML Output Template</h3>
        <pre class="mb-4">
          <Copy selectName="copyHtml" />
          <div class="output-scroll">
            <code>{{ output.html }}</code>
            <textarea id="copyHtml">{{ output.html }}</textarea>
          </div>
        </pre>
      </div>
    </div>

    <div id="toggle_static" v-else-if="version == 'static'">
      <h3>Static HTML</h3>
      <pre class="mb-4" style="position: relative;">
        <Copy selectName="copyStatic" />
        <div class="output-scroll">
          <code>{{ output.static }}</code>
          <textarea id="copyStatic">{{ output.static }}</textarea>
        </div>
      </pre>
    </div>
  </FormulateForm>
</template>

<script>
import Copy from './Copy';
import { rteFields, rteHtml } from '../templates/richtext.js';
import { imgFields, imgHtml } from '../templates/image.js';
import { ctaFields, ctaHtml } from '../templates/cta.js';

export default {
  name: 'Inputs',
  components: {
    Copy,
  },
  data() {
    return {
      data: {},
      version: 'static',
      output: {
        fields: '',
        html: '',
        static: '',
      },

      // for ux
      is_img_static: false,
      brand_style: false,
      is_standard: false,
    };
  },
  methods: {
    generateCode() {
      const data = this.data;
      switch (data.element) {
        case 'richtext':
          this.output.fields = rteFields(data).trim();
          this.output.html = rteHtml(data).trim();
          this.output.static = rteHtml(data, true).trim();
          break;
        case 'image':
          this.output.fields = imgFields(data).trim();
          this.output.html = imgHtml(data).trim();
          this.output.static = imgHtml(data, true).trim();
          break;
        case 'cta':
          this.output.fields = ctaFields(data).trim();
          this.output.html = ctaHtml(data).trim();
          this.output.static = ctaHtml(data, true).trim();
          break;
      }

      this.goto('output');
    },
    goto(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  watch: {
    // auto dash inserted
    moduleId() {
      let realNum = this.moduleId.replace(/-/gi, '');
      let dashNum = realNum.match(/.{3}/g);

      if (dashNum) {
        this.moduleId = dashNum.join('-');
      }
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

textarea {
  opacity: 0;
  height: 1px;
}

pre {
  background-color: #d6dce6;
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  border-radius: 6px;
  overflow: auto;
  position: relative;
}

.output-scroll {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 450px;
}

code {
  font-size: 0.9em;
}
.noselect {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@media (min-width: 720px) {
  .output-col {
    width: 49%;
  }
}
</style>
