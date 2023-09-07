import { toTitleCase } from '../utilities/string';

function getBrandStyle(data, prop, default_val) {
  const {group_id, is_standard, module_id} = data;
  let val = "";

  // standard module
  if (is_standard) { 
    val = `{{brandvalue brand.custom_modules "" "${module_id}" "${group_id}_${prop}" "${default_val}"}}`;
  // custom module
  } else {
    val = default_val;
  }
  
  return val;
}
/**
 * Compile final image fields code 
 * @param {string} module id
 * return {string} html
 */
export function imgFields(data) {
  const {group_id, group_label, image_width, image_height, is_img_static } = data;
  const imagePattern = "^(http|https):\\/\\/?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$|^\\$\\{?([a-zA-Z0-9_.-]*)\\}";

  return `
<!-- ${group_label.toUpperCase()} GROUP -->
<cbn-group id="${group_id}" label="${toTitleCase(group_label)}">

  <!-- Boolean -->
  <cbn-field
    id="${group_id}_show"
    label="Show"
    type="boolean"
    default="${getBrandStyle(data, 'boolean', true)}">
  </cbn-field>

  <cbn-text 
    id="LABEL_IMG_PROPERTIES" 
    label="persistent instructions"
    type="instruction" 
    default="<strong>PROPERTIES</strong>">
  </cbn-text>
  <cbn-text
    id="LABEL_img_source"
    label="persistent instructions"
    type="instruction"
    default="<strong>Source</strong><br>Width: ${image_width}px<br>Height: Flexible">
  </cbn-text>

  <cbn-field
    id="${group_id}_src_url"
    label=""
    type="image"
    required="true"
    enable-personalization="true"
    required="true"
    validation-pattern="${imagePattern}"
    pattern-validation-message="must be a valid url beginning with http or https"
    default="${getBrandStyle(data, 'src_url', 'https://via.placeholder.com/'+image_width+'x'+image_height+'/999999/ffffff?text=Image')}">
  </cbn-field>
  <cbn-field
    id="${group_id}_alt_text"
    label="Alt Text"
    type="text"
    enable-personalization="true"
    default="${getBrandStyle(data, 'alt_text', '')}">
  </cbn-field>

  <!-- ACTION -->
  <cbn-text
    id="LABEL_ACTION"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>ACTION</strong>">
  </cbn-text>
  <cbn-field
    id="${group_id}_link_url"
    label=""
    type="url"
    enable-personalization="true"
    default="${getBrandStyle(data, 'link_url', '')}">
  </cbn-field>
${( () => { 
// START INTERPOLATION
  if (is_img_static) {
    return `
  <cbn-field 
    id="${group_id}_width" 
    label="Width | Max XXX" 
    type="integer" 
    whole-number="true"
    enable-personalization="true" 
    default="${getBrandStyle(data, 'width', 280)}" 
    display_if="{{falsy full_boolean}}">
  </cbn-field>`
  }
// END INTERPOLATION
})()}
</cbn-group>`;
}

/**
 * Compile final image html code
 * @param {string} module id
 * return {string} html
 */
export function imgHtml(data, is_static) {
  const {
    group_id,
    group_label,
    image_width,
    image_height,
    is_img_static,
    img_col
  } = data;

  let style = {
    img: `{{${group_id}_src_url}}`,
    alt: `{{${group_id}_alt_text}}`,
    link: `{{${group_id}_link_url}}`,
  };

  switch (img_col) {
    case '2':
      style.width = `{{#if full_boolean}}{{#if middle_margins_boolean}}300{{else}}290{{/if}}{{else}}{{#if middle_margins_boolean}}320{{else}}309.33{{/if}}{{/if}}`;
      break;
    case '3':
      style.width =`{{#if full_boolean}}{{#if middle_margins_boolean}}200{{else}}188{{/if}}{{else}}{{#if middle_margins_boolean}}213.33{{else}}200{{/if}}{{/if}}`;
      break;
    case '4':
      style.width =`{{#if full_boolean}}{{#if middle_margins_boolean}}150{{else}}141.38{{/if}}{{else}}{{#if middle_margins_boolean}}151{{else}}160{{/if}}{{/if}}`;
      break;
    default:
      style.width = `{{#if full_boolean}}600{{else}}640{{/if}}`;
      break;
  };

  if (is_img_static) {
    style.width = `{{${group_id}_width}}`
  }

  if (is_static) {
    style = {
      img: `https://via.placeholder.com/${image_width}x${image_height}/999999/ffffff/?text=Scaled+Image`,
      alt: '',
      width: image_width,
      link: '',
    };
  }

  return `
  ${!is_static ? '{{#if ' +group_id+'_show}}' : ''}
  <table role="presentation" width="100%" align="center" cellpadding="0" cellspacing="0" border="0">
    <tr>
  ${( () => { 
  // START INTERPOLATION
    if (is_static) {
      return `<td>`;
    } else {
      return `<td data-groupid="${group_id}">`;
    }
  // END INTERPOLATION
  })()}
        <!-- Start ${group_label} -->
        ${!is_static ? '{{#if '+group_id+'_link_url}}' : ''}<a data-managed-link="${group_id}_link_url" href="${style.link}" target="_blank">${!is_static ? '{{/if}}' : ''}<img agilecontent="true" src="${style.img}" alt="${style.alt}" width="${style.width}" height="auto" style="display: block;" border="0"${!is_img_static ? ' class="wrap"' : ''}>${!is_static ? '{{#if '+group_id+'_link_url}}' : ''}</a>${!is_static ? '{{/if}}' : ''}
        <!-- End ${group_label} -->
      </td>
    </tr>
  </table>
  ${!is_static ? '{{/if}}' : ''}
  `;
}
