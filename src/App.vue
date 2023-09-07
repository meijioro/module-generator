<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal text-white">Epsilon</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a
          class="p-2 text-white"
          href="http://github01.epsilon.com/harmony/HarmonyVisualEditorModules/wiki#development"
        >
          Documentation
        </a>
        <a
          class="p-2 text-white"
          href="https://automation.epsilon.com/OSG/VisualEditorDeveloperGuide/Content/Assets?Templateid=25"
        >
          VE Developer Guide
        </a>
      </nav>

      <a
        class="btn btn-outline-info"
        href="https://json-generator-dist.glitch.me/"
      >
        Brand Style Generator
      </a>
    </div>

    <div class="container-fluid masthead">
      <header class="col">
        <h1 class="jumbotron-heading">Boilerplate Code Generator</h1>
        <p class="lead text-muted">
          Start your project by generating your custom module code quickly.
        </p>
      </header>
    </div>

    <div class="container-fluid border-top">
      <section class="row">
        <ul
          class="nav nav-tabs col-md-2 flex-column"
          role="tablist"
          style="padding: 2em 0 6em;"
        >
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="layout-tab"
              data-toggle="tab"
              href="#layout"
              role="tab"
              aria-controls="layout"
              aria-selected="true"
              >Step 1: Layout</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="module-tab"
              data-toggle="tab"
              href="#module"
              role="tab"
              aria-controls="module"
              aria-selected="false"
              >Step 2: Field Types</a
            >
          </li>
        </ul>

        <div
          class="col-md-10 tab-content border-left"
          style="padding: 2.5em 50px 6em;"
        >
          <!-- TAB 1 -->
          <div
            class="tab-pane fade show active"
            id="layout"
            role="tabpanel"
            aria-labelledby="layout-tab"
          >
            <Layout />
          </div>

          <!-- TAB 2 -->
          <div
            class="tab-pane fade"
            id="module"
            role="tabpanel"
            aria-labelledby="module-tab"
          >
            <Inputs />
          </div>
          <!-- END TAB 2 -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import './css/formulate.css';
import './css/style.css';

import Layout from './components/Layout';
import Inputs from './components/Inputs';

export default {
  name: 'App',
  components: {
    Layout,
    Inputs,
  },
  data() {
    return {
      outputField: '',
      outputTemplate: '',
    };
  },
  methods: {
    outputFunc(data) {
      this.outputField = data.fields && data.fields.trim();
      this.outputTemplate = data.html && data.html.trim();
    },
  },
};
</script>

<style>
.form-group-box {
  padding: 1.25rem;
  border: 1px solid #edefeb;
  border-radius: 0.25rem;
}

.nav-tabs .nav-link.active {
  border-color: #dee2e6 #dee2e6 #dee2e6 #dee2e6;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.25em;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  border-color: #e9ecef #fff #e9ecef #dee2e6;
}

.nav-tabs .nav-item {
  margin: 5px -1px 0 10px;
  position: relative;
  z-index: 1;
}
</style>
