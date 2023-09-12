import { toTitleCase } from '../utilities/string';

const getBrandStyle = (data, prop, default_val) => {
  const {group_id, is_standard, brand_style, module_id, brand_name_id} = data;
  let { html_tag } = data;
  let val = "";

  // standard module
  if (is_standard) { 

    //pull styles from brand
    if (brand_style) {

      if (html_tag == 'h5') {
        html_tag = 'h4';
      } else if (html_tag == 'p') {
        html_tag = 'p1';
      } 

      val = `{{brandvalue brand.custom_modules brand.font_styles.${html_tag}_${prop} "${module_id}" "${group_id}_${prop}" "${default_val}"}}`;
    // no brand style path
    } else {
      val = `{{brandvalue brand.custom_modules "" "${module_id}" "${group_id}_${prop}" "${default_val}"}}`;
    }
  // custom module
  } else {
    // pull styles from brand
    if (brand_style) {
      const tag = html_tag == 'p' ? 'paragraphs' : "headlines"; 
      val = `{{brandvalue "" brand.elements.${tag} "${brand_name_id}" "${prop}" "${default_val}"}}`;    // use default val
    } else {
      val = default_val;
    }
  }
  
  return val;
}


/**
 * Template literal to compile final richtext fields code
 * @param {string} module id
 * return {string} html 
 */
export function rteFields(data) {
  const { group_id, group_label } = data;

  return `
<!-- ${group_label.toUpperCase()} GROUP -->
<cbn-group id="${group_id}" label="${toTitleCase(group_label)}">

  <cbn-field
    id="${group_id}_show"
    label="Show"
    type="boolean"
    default="${getBrandStyle(data, 'boolean', true)}">
  </cbn-field>

  <!-- FONT STYLE -->
  <cbn-text
    id="${group_id}_PRIMARY_LABEL_font_style"
    label="persistent instructions"
    type="instruction"
    default="<strong>FONT STYLE</strong>">
  </cbn-text>

  <!-- Rich Text - Not visible -->
  <cbn-field
    id="${group_id}_text"
    label="Text"
    type="richtext"
    visable="false"
    default="<span style='font-size: 16px; line-height: 150%;'>Text Here</span>">
  </cbn-field>
  <cbn-field
    id="${group_id}_color"
    label="Color"
    type="color"
    visable="false"
    default="${getBrandStyle(data, 'color', '#000000')}">
  </cbn-field>
  <cbn-field
    id="${group_id}_font_weight"
    label="Font Weight"
    type="integer"
    visable="false"
    default="${getBrandStyle(data, 'font_weight', '400')}">
  </cbn-field>
  <cbn-field
    id="${group_id}_font_family"
    label="Font"
    type="font_family"
    visable="false"
    default="${getBrandStyle(data, 'font_family', 'Arial, Helvetica, sans-serif')}">
  </cbn-field>

  <!-- Font Styles - Visible -->
  <cbn-field
    id="${group_id}_line_height"
    label="Line Height | % format"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'line_height', '150')}">
  </cbn-field>
  <cbn-field
    id="${group_id}_letter_spacing"
    label="Letter Spacing | px format"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'letter_spacing', '0')}">
  </cbn-field>
  <cbn-field
    id="${group_id}_text_transform"
    label="Letter Case"
    type="select"
    default="${getBrandStyle(data, 'text_transform', 'none')}">
    <cbn-option value="none">none</cbn-option>
    <cbn-option value="uppercase">UPPERCASE</cbn-option>
    <cbn-option value="lowercase">lowercase</cbn-option>
  </cbn-field>

  <!-- POSITION -->
  <cbn-text
    id="${group_id}_PRIMARY_LABEL_position"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>POSITION</strong>">
  </cbn-text>
  <cbn-text
    id="${group_id}_SECONDARY_LABEL_alignment"
    label="persistent instructions"
    type="instruction"
    default="<strong>Alignment</strong>">
  </cbn-text>
  <cbn-field
    id="${group_id}_align"
    label=""
    type="align"
    default="${getBrandStyle(data, 'align', 'left')}">
  </cbn-field>

  <!-- Padding Fields -->
  <cbn-text
    id="${group_id}_SECONDARY_LABEL_padding"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>Padding</strong> | px format">
  </cbn-text>
  <cbn-field
    id="${group_id}_pad_top"
    label="Top"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'pad_top', "0")}">
  </cbn-field>
  <cbn-field
    id="${group_id}_pad_right"
    label="Right"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'pad_right', "0")}">
  </cbn-field>
  <cbn-field
    id="${group_id}_pad_bottom"
    label="Bottom"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'pad_bottom', "0")}">
  </cbn-field>
  <cbn-field
    id="${group_id}_pad_left"
    label="Left"
    type="integer"
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'pad_left', "0")}">
  </cbn-field>

  <!-- RESPONSIVE -->
  <cbn-text 
    id="${group_id}_PRIMARY_LABEL_responsive" 
    label="persistent instructions" 
    type="instruction" 
    default="<br><strong>RESPONSIVE</strong>">
  </cbn-text>
  <cbn-field
    id="${group_id}_mobile_fontsize"
    label="Font Style"
    type="select"
    default="${getBrandStyle(data, 'mobile_fontsize', "")}">
    <cbn-option value="">Match Desktop</cbn-option>
    <cbn-option value="h1">h1</cbn-option>
    <cbn-option value="h2">h2</cbn-option>
    <cbn-option value="h3">h3</cbn-option>
    <cbn-option value="h4">h4</cbn-option>
    <cbn-option value="p1">p1</cbn-option>
    <cbn-option value="p2">p2</cbn-option>
    <cbn-option value="p3">p3</cbn-option>
  </cbn-field>
  <cbn-field
    id="${group_id}_mobile_alignment"
    label="Alignment"
    type="select"
    default="${getBrandStyle(data, 'mobile_alignment', "")}">
    <cbn-option value="">Match Desktop</cbn-option>
    <cbn-option value="left">Left</cbn-option>
    <cbn-option value="center">Center</cbn-option>
    <cbn-option value="right">Right</cbn-option>
  </cbn-field>
</cbn-group>
`;
}

/**
 * Template literal to compile final richtext fields code
 * @param {string} module id
 * return {string} html
 */
export function rteHtml(data, is_static) {
  const { group_id, group_label, html_tag, is_simple_rte } = data;

  // dynamic code settings
  let style = {
    rtl: `{{#if is_rtl_text}}dir="rtl"{{/if}}`,
    align: `{{${group_id}_align}}`,
    padding: `{{${group_id}_pad_top}}px {{${group_id}_pad_right}}px {{${group_id}_pad_bottom}}px {{${group_id}_pad_left}}px`,
    classname: `{{${group_id}_mobile_alignment}} pad0rl`,
    lineheight: `{{${group_id}_line_height}}`,
    fontweight: `{{${group_id}_font_weight}}`,
    letterspacing: `{{${group_id}_letter_spacing}}`,
    texttransform: `{{${group_id}_text_transform}}`,
    color: `{{${group_id}_color}}`,
    fontfamily: `{{${group_id}_font_family}}`,
    mobileclass: `mobile_{{${group_id}_mobile_fontsize}}`,
    text: `{{{${group_id}_text}}}`,
  };

  // override dyanmitc code settings with static values
  if (is_static) {
    style = {
      rtl: '',
      align: 'left',
      padding: '0px 0px 0px 0px',
      classname: 'center pad0rl',
      lineheight: html_tag == 'p' ? '150' : '120',
      fontweight: '400',
      letterspacing: '0',
      texttransform: 'none',
      color: '#000000',
      fontfamily: 'Arial, Helvetica, sans-serif',
      mobileclass: `mobile_match`,
      text: `Lorem Ipsum`,
    };
  }

  return `
  <!-- start ${group_label} -->
  ${!is_static ? '{{#if '+group_id+'_show}}' : ''}
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td ${style.rtl} align="${style.align}" valign="top" style="padding: ${style.padding};" class="${style.classname}"><${html_tag} style="font-size: 14px; mso-line-height-rule: exactly; line-height: ${style.lineheight}%; margin: 0px; font-weight: ${style.fontweight}; letter-spacing: ${style.letterspacing}px; text-transform: ${style.texttransform}; color: ${style.color}; font-family: ${style.fontfamily};" ${is_simple_rte ? 'richtext-mode="simple"' : ''} cbn-editable="richtext" data-richtext="${group_id}_text" data-groupid="${group_id}" class="${style.mobileclass}">${style.text}</${html_tag}></td>
    </tr>
  </table>
  ${!is_static ? '{{/if}}' : ''}
  <!-- end ${group_label} -->
  `;
}
