import { toTitleCase } from '../utilities/string';

function getBrandStyle(data, prop, default_val) {
  const {group_id, is_standard, brand_style, module_id, brand_name_id} = data;
  let val = "";

  // standard module
  if (is_standard) { 

    //pull styles from brand
    if (brand_style) {
      val = `{{{brandvalue brand.custom_modules brand.cta.${prop} "${module_id}" "${group_id}_cta_${prop}" "${default_val}"}}}`;
    // no brand style path
    } else {
      val = `{{{brandvalue brand.custom_modules "" "${module_id}" "${group_id}_cta_${prop}" "${default_val}"}}}`;
    }
  // custom module
  } else {
    // pull styles from brand
    if (brand_style) {
      val = `{{{brandvalue "" brand.elements.ctas "${brand_name_id}" "${prop}" "${default_val}"}}}`;    // use default val
    } else {
      val = default_val;
    }
  }
  
  return val;
}


export function ctaFields(data) {
  const { group_label, is_standard, cta_design_type, cta_icon } = data;
  let { group_id } = data;
  const imagePattern = "^(http|https):\\/\\/?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$|^\\$\\{?([a-zA-Z0-9_.-]*)\\}";
  const colorPattern = "^#([0-9a-fA-F]{6}){1,2}$|^\\$\\{?([a-zA-Z0-9_.-]*)}";

  // in case '_cta' is in the group id since it's not needed
  group_id = group_id.replace('_cta', '');

  return `
<!-- ${group_label.toUpperCase()} GROUP -->
<cbn-group id="${group_id}_cta" label="${toTitleCase(group_label)}">
  <!-- Boolean -->
  <cbn-field 
    id="${group_id}_cta_show" 
    label="Show" 
    type="boolean" 
    default="${getBrandStyle(data, 'boolean', 'true')}">
  </cbn-field>

  <!-- Global Hidden Vars -->
  <cbn-field 
    id="${group_id}_cta_max_val_fullwidth" 
    label="Static max width if email is full width. Hidden field for template purpose." 
    type="integer"
    visable="false"
    default="640">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_max_val_fullwidth_mobile" 
    label="Static max width if email is full width. Hidden field for template purpose." 
    type="integer"
    visable="false"
    default="320">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_max_val_margins" 
    label="Static max width if email has margins. Hidden field for template purpose." 
    type="integer"
    visable="false"
    default="600">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_max_val_margins_mobile" 
    label="Static max width if email has margins. Hidden field for template purpose." 
    type="integer"
    visable="false"
    default="280">
  </cbn-field>

  <!-- DESIGN -->
  <cbn-text 
    id="${group_id}_cta_PRIMARY_LABEL_design" 
    label="persistent instructions" 
    type="instruction" 
    default="<strong>DESIGN</strong>">
  </cbn-text>
${(() => {
// START INTERPOLATION
  if (is_standard) {
    return `
  <cbn-field 
    id="${group_id}_cta_icon_boolean" 
    label="Add an Icon" 
    type="boolean" 
    default="${getBrandStyle(data, 'icon_boolean', 'false')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_icon_left_boolean" 
    label="Move Icon to the Left" 
    type="boolean"
    default="${getBrandStyle(data, 'icon_left_boolean', 'false')}"
    display_if="{{truthy ${group_id}_cta_icon_boolean}}">
  </cbn-field>
  
  <cbn-field 
    id="${group_id}_cta_border_boolean" 
    label="Add a Border | Cannot be used with rounded corners" 
    type="boolean" 
    default="${getBrandStyle(data, 'border_boolean', 'false')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_rounded_boolean" 
    label="Add Rounded Corners | Cannot be used with border" 
    type="boolean"
    default="${getBrandStyle(data, 'rounded_boolean', 'false')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_border_rounded_boolean" 
    label="Add Rounded Corners and Border" 
    type="boolean" 
    default="${getBrandStyle(data, 'border_rounded_boolean', 'false')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_image_boolean" 
    label="Make the CTA an Image" 
    type="boolean" 
    default="${getBrandStyle(data, 'image_boolean', 'false')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_left_right_image_boolean" 
    label="Add Left and Right Images" 
    type="boolean" 
    default="${getBrandStyle(data, 'left_right_image_boolean', 'false')}">
  </cbn-field>`
  } else {
    return `
  <cbn-field
    id="${group_id}_cta_style"
    label="Style"
    type="select"
    default="${getBrandStyle(data, 'design', cta_design_type)}">
    <cbn-option value="square">Square</cbn-option>
    <cbn-option value="border">Border</cbn-option>
    <cbn-option value="rounded">Rounded</cbn-option>
    <cbn-option value="border_rounded">Border Rounded</cbn-option>
    <cbn-option value="image">Image</cbn-option>
    <cbn-option value="side_images">Left and Right Images</cbn-option>
  </cbn-field>

  <cbn-field
    id="${group_id}_cta_icon"
    label="Icon"
    type="select"
    default="${getBrandStyle(data, 'icon', cta_icon)}">
    <cbn-option value="no">No Icon</cbn-option>
    <cbn-option value="right">Add to Right</cbn-option>
    <cbn-option value="left">Add to Left</cbn-option>
  </cbn-field>`
  }
// END INTERPOLATION
})()}

  <!-- ACTION -->
  <cbn-text 
    id="${group_id}_cta_PRIMARY_LABEL_action" 
    label="persistent instructions" 
    type="instruction" 
    default="<br><strong>ACTION</strong>">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_link_url" 
    label="" 
    type="url" 
    default="${getBrandStyle(data, 'link_url', '')}">
  </cbn-field>

  <!-- POSITION -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_position"
    label="persistent instructions"
    type="instruction"
    default="<strong>POSITION</strong>">
  </cbn-text>
  <cbn-text
    id="${group_id}_cta_SECONDARY_LABEL_alignment"
    label="persistent instructions"
    type="instruction"
    default="<strong>Alignment</strong>">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_alignment" 
    label="" 
    type="align" 
    default="${getBrandStyle(data, 'alignment', 'center')}">
  </cbn-field> 

  <!-- CTA Padding Fields -->
  <cbn-text
    id="${group_id}_cta_SECONDARY_LABEL_padding"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>Padding</strong> | px format">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_pad_top" 
    label="Top" 
    type="integer"
    required="true" 
    whole-number="true"
    default="${getBrandStyle(data, 'pad_top', '0')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_pad_right" 
    label="Right" 
    type="integer"
    required="true" 
    whole-number="true"
    default="${getBrandStyle(data, 'pad_right', '0')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_pad_bottom" 
    label="Bottom" 
    type="integer" 
    required="true" 
    whole-number="true"
    default="${getBrandStyle(data, 'pad_bottom', '0')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_pad_left" 
    label="Left" 
    type="integer" 
    required="true" 
    whole-number="true"
    default="${getBrandStyle(data, 'pad_left', '0')}">
  </cbn-field>

  <!-- IMAGE CTA -->
  <cbn-text
    id="${group_id}_cta_image_PRIMARY_LABEL_properties"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>IMAGE</strong>"
    display_if="{{truthy ${group_id}_cta_image_boolean}}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_src_url" 
    label="" 
    type="image" 
    required="true"
    enable-personalization="true"
    validation-pattern="${imagePattern}"
    pattern-validation-message="Must be a valid url beginning with http or https"
    hide-options="brandstyle"
    default="${getBrandStyle(data, 'src_url', 'https://via.placeholder.com/280x50/999999/ffffff?text=Static+Image')}" 
    display_if="${(() => {
    // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}true{{else}}false{{/if}}`;
      }  
    // END INTERPOLATION
    })()}">
  </cbn-field>

  <cbn-field 
    id="${group_id}_cta_image_width" 
    label="Width | Max {{${group_id}_cta_max_val_fullwidth_mobile}}" 
    type="integer"
    required="true" 
    whole-number="true"
    max="280"
    enable-personalization="true"
    default="${getBrandStyle(data, 'image_width', '240')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_alt_text" 
    label="Alt Text" 
    type="text" 
    enable-personalization="true"
    default="${getBrandStyle(data, 'alt_text', '')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  
  <!-- IMAGE CTA ROUNDED CORNERS -->
  <cbn-text
    id="${group_id}_cta_image_PRIMARY_LABEL_rounded_corners"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>ROUNDED CORNERS</strong> | Not supported in Outlook"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-text>
  <cbn-field
    id="${group_id}_cta_image_radius"
    label="Radius | px format"
    type="integer"
    enable-personalization="true"
    default="${getBrandStyle(data, 'cta_image_radius', '0')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>

  <!-- LEFT AND RIGHT IMAGE CTA -->
  <cbn-text
    id="${group_id}_cta_left_image_PRIMARY_LABEL_properties"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>LEFT IMAGE</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_left_image_src_url" 
    label="" 
    type="image" 
    required="true"
    validation-pattern="${imagePattern}"
    pattern-validation-message="Must be a valid url beginning with http or https"
    hide-options="brandstyle"
    default="${getBrandStyle(data, 'left_image_src_url', 'https://via.placeholder.com/50x50/999999/ffffff?text=Left+Image')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_left_image_width" 
    label="Width | Max 100" 
    type="integer"
    required="true"
    whole-number="true"
    max="100"
    enable-personalization="true"
    default="${getBrandStyle(data, 'left_image_width', '50')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_left_image_alt_text" 
    label="Alt Text" 
    type="text" 
    enable-personalization="true"
    default="${getBrandStyle(data, 'left_image_alt_text', '')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  
  <cbn-text
    id="${group_id}_cta_right_image_PRIMARY_LABEL_properties"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>RIGHT IMAGE</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_right_image_src_url" 
    label="" 
    type="image" 
    required="true"
    enable-personalization="true"
    validation-pattern="${imagePattern}"
    pattern-validation-message="Must be a valid url beginning with http or https"
    hide-options="brandstyle"
    default="${getBrandStyle(data, 'right_image_src_url', 'https://via.placeholder.com/50x50/999999/ffffff?text=Right+Image')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_right_image_width" 
    label="Width | Max 100" 
    type="integer" 
    required="true"
    whole-number="true"
    max="100"
    enable-personalization="true"
    default="${getBrandStyle(data, 'right_image_width', '50')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_right_image_alt_text" 
    label="Right Image Alt Text" 
    type="text" 
    default="${getBrandStyle(data, 'right_image_alt_text', '')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_left_right_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'side_images')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
      })()}">
  </cbn-field>

  <!-- FONT STYLE -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_font_style"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>FONT STYLE</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_text" 
    label="CTA Text" 
    type="richtext" 
    visable="false"
    default="${getBrandStyle(data, 'text', '<span style=\'font-size: 16px; line-height: 150%;\'>CTA Text</span>')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_color" 
    label="CTA Color" 
    type="color"
    visable="false" 
    default="${getBrandStyle(data, 'color', '#FFFFFF')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_font_family" 
    label="Font" 
    type="font_family" 
    visable="false" 
    default="${getBrandStyle(data, 'font_family', 'Arial, Helvetica, sans-serif')}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_font_weight" 
    label="Font Weight" 
    type="integer" 
    visable="false" 
    default="${getBrandStyle(data, 'font_weight', '400')}">
  </cbn-field>

  <!-- Font Styles visible -->
  <cbn-field 
    id="${group_id}_cta_line_height" 
    label="Line Height | % format" 
    type="integer"
    required="true" 
    whole-number="true"
    enable-personalization="true"
    default="${getBrandStyle(data, 'line_height', '150')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_letter_spacing" 
    label="Letter Spacing | px format" 
    type="integer" 
    required="true"
    whole-number="true"
    enable-personalization="true"
    default="${getBrandStyle(data, 'letter_spacing', '0')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_text_transform" 
    label="Letter Case" 
    type="select" 
    default="${getBrandStyle(data, 'text_transform', 'none')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
    <cbn-option value="none">none</cbn-option>
    <cbn-option value="uppercase">UPPERCASE</cbn-option>
    <cbn-option value="lowercase">lowercase</cbn-option>
  </cbn-field>

  <!-- TEXT POSITION -->
  <cbn-text
    id="cta_PRIMARY_LABEL_text_position"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>TEXT POSITION</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_text_alignment" 
    label="" 
    type="align" 
    default="${getBrandStyle(data, 'text_alignment', 'center')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-text
    id="${group_id}_cta_SECONDARY_LABEL_text_padding"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>Padding</strong> | px format"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_text_pad_topbottom" 
    label="Top and Bottom" 
    type="integer"
    required="true"
    whole-number="true" 
    default="${getBrandStyle(data, 'text_pad_topbottom', '10')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_text_pad_leftright" 
    label="Left and Right" 
    type="integer" 
    required="true"
    whole-number="true"
    default="${getBrandStyle(data, 'text_pad_leftright', '20')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  

  <!-- BUTTON -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_button"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>BUTTON</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_bgcolor" 
    label="Color" 
    type="color"
    enable-personalization="true"
    validation-pattern="${colorPattern}"
    pattern-validation-message="Enter a valid six digit hex code starting with #"
    default="${getBrandStyle(data, 'bgcolor', '#da2128')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_width_type" 
    label="Width Type" 
    type="select" 
    default="${getBrandStyle(data, 'width_type', 'fixed')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{falsy ${group_id}_cta_image_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'image')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
    <cbn-option value="fixed">Fixed Width</cbn-option>
    <cbn-option value="fluid">100% (fills horizontal space)</cbn-option>
    <cbn-option value="auto">Auto (wide as text)</cbn-option>
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_width" 
    label="Width | px format" 
    type="integer"
    required="true"
    whole-number="true"
    max="640"
    max-value-validation-message="Must be a max of 640 (full width) or 600 (side margins)."
    enable-personalization="true" 
    default="${getBrandStyle(data, 'width', '280')}" 
    display_if="{{#if ${group_id}_cta_image_boolean}}false{{else if (compare ${group_id}_cta_width_type 'fixed')}}true{{else}}false{{/if}}">
  </cbn-field>

  <!-- ICON -->
  <cbn-text
    id="${group_id}_cta_icon_PRIMARY_LABEL_properties"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>ICON</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_icon_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_icon 'none')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_icon_src" 
    label="" 
    type="image"
    validation-pattern="${imagePattern}"
    pattern-validation-message="Must be a valid url beginning with http or https"
    enable-personalization="true" 
    hide-options="brandstyle"
    default="${getBrandStyle(data, 'icon_src', 'https://via.placeholder.com/20x20/999999/ffffff')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_icon_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_icon 'none')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_icon_width" 
    label="Width | Max 50" 
    type="integer"
    whole-number="true"
    max="50"
    enable-personalization="true"
    default="${getBrandStyle(data, 'icon_width', '20')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_icon_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_icon 'none')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_icon_pad" 
    label="Padding Between Text and Icon | px format" 
    type="integer"
    whole-number="true"
    default="${getBrandStyle(data, 'icon_pad', '10')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_icon_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_icon 'none')}}false{{else}}true{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>

  <!-- BORDER -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_border_CTA"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>BORDER</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_border_color" 
    label="Color" 
    type="color"
    enable-personalization="true"
    required="true"
    validation-pattern="${colorPattern}"
    pattern-validation-message="Enter a valid six digit hex code starting with #"
    default="${getBrandStyle(data, 'border_color', '#CCCCCC')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_border_width" 
    label="Width | px format" 
    type="integer" 
    required="true"
    whole-number="true"
    enable-personalization="true"
    default="${getBrandStyle(data, 'border_width', '5')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>

  <!-- ROUNDED CORNERS -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_rounded_CTA"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>ROUNDED CORNERS</strong> | Not supported on Outlook"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_border_radius" 
    label="Radius | px format" 
    type="integer"
    whole-number="true" 
    enable-personalization="true"
    default="${getBrandStyle(data, 'border_radius', '10')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>

  <!-- ROUNDED CORNERS AND BORDER -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_rounded_border_CTA"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>ROUNDED CORNERS AND BORDER</strong>"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border_rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-text>
  <cbn-field 
    id="${group_id}_cta_border_rounded_color" 
    label="Color" 
    type="color" 
    enable-personalization="true"
    required="true"
    validation-pattern="${colorPattern}"
    pattern-validation-message="Enter a valid six digit hex code starting with #"
    default="${getBrandStyle(data, 'border_rounded_color', '#CCCCCC')}"
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border_rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_border_rounded_width" 
    label="Width | px" 
    type="integer"
    required="true"
    whole-number="true" 
    enable-personalization="true"
    default="${getBrandStyle(data, 'border_rounded_width', '5')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border_rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_border_rounded_radius" 
    label="Radius | px" 
    type="integer" 
    required="true"
    whole-number="true"
    enable-personalization="true"
    default="${getBrandStyle(data, 'border_rounded_radius', '10')}" 
    display_if="${(() => {
      // START INTERPOLATION
      if (is_standard) {
        return `{{truthy ${group_id}_cta_border_rounded_boolean}}`;
      } else {
        return `{{#if (compare ${group_id}_cta_style 'border_rounded')}}true{{else}}false{{/if}}`;
      }  
      // END INTERPOLATION
    })()}">
  </cbn-field>

  <!-- RESPONSIVE -->
  <cbn-text
    id="${group_id}_cta_PRIMARY_LABEL_responsive"
    label="persistent instructions"
    type="instruction"
    default="<br><strong>RESPONSIVE</strong>">
  </cbn-text>
  
  <!-- display_if work around; VE buggy -->
  <cbn-field 
    id="${group_id}_cta_box_boolean" 
    label="Match Desktop Width" 
    type="boolean" 
    default="${getBrandStyle(data, 'box_boolean', 'false')}"
    display_if="{{#if (compare ${group_id}_cta_width_type 'fixed')}}true{{else if (compare ${group_id}_cta_width_type 'auto')}}true{{else}}false{{/if}}">
  </cbn-field>
  <cbn-field 
    id="${group_id}_cta_mobile_align" 
    label="Alignment" 
    type="select" 
    default="${getBrandStyle(data, 'mobile_align', '')}"
    display_if="{{#if ${group_id}_cta_box_boolean}}{{#if (compare ${group_id}_cta_width_type 'auto')}}true{{else if (compare ${group_id}_cta_width_type 'fixed')}}true{{else}}false{{/if}}{{else}}false{{/if}}">
    <cbn-option value="">Match Desktop</cbn-option>
    <cbn-option value="margin-left">Left</cbn-option>
    <cbn-option value="margin0">Center</cbn-option>
    <cbn-option value="margin-right">Right</cbn-option>
  </cbn-field>

  <cbn-field 
    id="${group_id}_cta_mobile_fontsize" 
    label="Font Size" 
    type="select" 
    default="${getBrandStyle(data, 'mobile_fontsize', '')}">
    <cbn-option value="">Match Desktop</cbn-option>
    <cbn-option value="mobile_cta">Responsive Class</cbn-option>
  </cbn-field>
</cbn-group>
`;
}


/**
 * 
 * @param {*} group_id 
 * @param {*} cta_design_type 
 * @param {*} cta_icon 
 * @param {*} style 
 * @param {*} is_static 
 * @returns 
 */
function text_version(group_id, cta_design_type, cta_icon, style, is_static, is_standard) {
  return `<!-- start BOX CTA -->${!is_static ? '{{! if fixed width, check if side margins, if side margins check if less than max width, if not then force 100% to not break layout, no checking full width max cause validation is on field }}' : ''}
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="${style.cta_width}" class="${style.table_class}">
            <tr>
${(() => {
// START INTERPOLATION
            if (is_static && cta_design_type == 'side_images') {
              return `
              <td align="left" width="50"><a href="" target="_blank"><img src="https://via.placeholder.com/50x50/999999/ffffff?text=Max100+x+FLEX" alt="" width="50" height="auto" border="0" style="display: block"></a></td>`;
            } else if (!is_static){
              let typeOfCompare = `{{#if (compare ${group_id}_cta_style 'side_images')}}`;
              if (is_standard) { typeOfCompare = `{{#if ${group_id}_cta_left_right_image_boolean}}`;}
              return `
              ${typeOfCompare}
              <td align="left" width="{{${group_id}_cta_left_image_width}}">{{#if ${group_id}_cta_link_url}}<a href="{{${group_id}_cta_link_url}}" data-managed-link="${group_id}_cta_link_url" target="_blank">{{/if}}<img agilecontent="true" src="{{${group_id}_cta_left_image_src_url}}" data-groupid="${group_id}_cta" alt="{{${group_id}_cta_left_image_alt_text}}" width="{{${group_id}_cta_left_image_width}}" height="auto" border="0" style="display: block">{{#if ${group_id}_cta_link_url}}</a>{{/if}}</td>{{/if}}`;
            } else {
              return '';
            }
// END INTERPOLATION
})()}
              <td align="${style.text_align}" valign="${style.valign}" ${style.cta_bgcolor} ${(() => { // START INTERPOLATION
          if (is_static) {
            if (cta_design_type == 'rounded') {
              return `style="border-radius: 100px"`;
            } else if (cta_design_type == 'border') {
              return `style="border: 5px solid #cccccc;"`;
            } else if (cta_design_type == 'border_rounded') {
              return `style="border: 5px solid #cccccc; border-radius: 10px"`;
            } else {
              return '';
            }
          } else {
            if (is_standard) {
              return `
              {{#if ${group_id}_cta_border_boolean}}style="border: {{${group_id}_cta_border_width}}px solid {{${group_id}_cta_border_color}};"{{else if ${group_id}_cta_rounded_boolean}}style="border-radius: {{${group_id}_cta_border_radius}}px;"{{else if ${group_id}_cta_border_rounded_boolean}}class="wrapto100pc gmailbutton" style="border: {{${group_id}_cta_border_rounded_width}}px solid {{${group_id}_cta_border_rounded_color}}; border-radius: {{${group_id}_cta_border_rounded_radius}}px;"{{/if}}`;
            } else {
              return `{{#if (compare ${group_id}_cta_style 'border')}}style="border: {{${group_id}_cta_border_width}}px solid {{${group_id}_cta_border_color}};"{{else if (compare ${group_id}_cta_style 'rounded')}}style="border-radius: {{${group_id}_cta_border_radius}}px;"{{else if (compare ${group_id}_cta_style 'border_rounded')}}class="wrapto100pc gmailbutton" style="border: {{${group_id}_cta_border_rounded_width}}px solid {{${group_id}_cta_border_rounded_color}}; border-radius: {{${group_id}_cta_border_rounded_radius}}px;"{{/if}}`;
            }
          }                        
// END INTERPOLATION 
})()}> 
                <!-- start CTA text block -->
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="left" valign="top" style="padding: ${style.cta_text_pad_topbottom}px ${style.cta_text_pad_leftright}px;"> 
                      <!-- START INNER CTA -->
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" ${(() => {
                      // START INTERPOLATION
                        if (cta_icon == 'left' && is_static) {
                          return `dir="rtl"`;
                        } else if (!is_static) {
                          if (is_standard) {
                            return `{{#if ${group_id}_cta_icon_left_boolean}}dir="rtl"{{/if}}`;
                          } else {
                            return `{{#if (compare ${group_id}_cta_icon 'left')}}dir="rtl"{{/if}}`
                          }
                        } else {
                          return '';
                        }
                      // END INTERPOLATION 
                      })()}>
                        <tr>
                          <td dir="${style.rtl}" class="wrap ${style.cta_mobile_fontsize}" align="center" valign="middle" style="font-weight: ${style.weight}; letter-spacing: ${style.letterspacing}px; text-transform: ${style.texttransform};"><span style="color: ${style.color}; font-family: ${style.fontfamily}; font-size: 14px; mso-line-height-rule: exactly; line-height: ${style.lineheight}%; white-space: nowrap;" enable-personalization="true" richtext-mode="simple" cbn-editable="richtext" data-richtext="${group_id}_cta_text" data-groupid="${group_id}_cta">${is_static ? '<a href="" style="color:'+style.color+';text-decoration: none;" target="_blank">' : '{{#if '+group_id+'_cta_link_url}}<a href="{{'+group_id+'_cta_link_url}}" data-managed-link="'+group_id+'_cta_link_url" target="_blank" style="color: '+style.color+'; text-decoration: none; font-weight: '+style.weight+'">{{/if}}'}${style.text}${is_static ? '</a>' : '{{#if '+group_id+'_cta_link_url}}</a>{{/if}}'}</span></td>
  ${(() => {
  // START INTERPOLATION
            if (is_static && cta_icon !== 'no') {
              return `
                          <td align="${(cta_icon == 'left') ? 'right' : 'left'}" valign="middle" style="${(cta_icon == 'left') ? 'padding-right:' : 'padding-left:'} 10px; line-height: 0px; min-width:20px;"><a href="" target="_blank"><img src="https://via.placeholder.com/20x20/999999/ffffff" height="auto" style="display: block;" border="0" width="20"></a></td>`; 
            } else if (!is_static){
              if (is_standard) {
                return `
                        {{#if ${group_id}_cta_icon_boolean}}
                          <td align="{{#if ${group_id}_cta_icon_left_boolean}}right{{else}}left{{/if}}" valign="middle" style="{{#if ${group_id}_cta_icon_left_boolean}}padding-right:{{else}}padding-left:{{/if}} {{${group_id}_cta_icon_pad}}px; line-height: 0px; min-width:{{${group_id}_cta_icon_width}}px;" data-groupid="${group_id}_cta"><!-- start cta icon -->{{#if ${group_id}_cta_link_url}}<a href="{{${group_id}_cta_link_url}}" data-managed-link="${group_id}_cta_link_url" target="_blank">{{/if}}<img src="{{${group_id}_cta_icon_src}}" height="auto" style="display: block;" border="0" width="{{${group_id}_cta_icon_width}}">{{#if ${group_id}_cta_link_url}}</a>{{/if}} 
                          <!-- end cta icon --></td>
                        {{/if}}`
              } else {
                return `
                        {{#if (compare ${group_id}_cta_icon '!==' 'none')}}
                          <!-- start cta icon -->
                          <td align="{{#if (compare ${group_id}_cta_icon 'left')}}right{{else}}left{{/if}}" valign="middle" style="padding-{{#if (compare ${group_id}_cta_icon 'left')}}right{{else}}left{{/if}}: {{${group_id}_cta_icon_pad}}px; line-height: 0px; min-width:{{${group_id}_cta_icon_width}}px;" data-groupid="${group_id}_cta">{{#if ${group_id}_cta_link_url}}<a href="{{${group_id}_cta_link_url}}" data-managed-link="${group_id}_cta_link_url" target="_blank" style="color: {{${group_id}_cta_color}}; text-decoration: none;">{{/if}}<img src="{{${group_id}_cta_icon_src}}" height="auto" style="display: block;" border="0" width="{{${group_id}_cta_icon_width}}">{{#if ${group_id}_cta_link_url}}</a>{{/if}}</td>
                          <!-- end cta icon -->
                        {{/if}}`
              }
            } else {
              return '';
            }
 // END INTERPOLATION 
})()}
                        </tr>
                      </table>
                      <!-- END INNER CTA -->
                    </td>
                  </tr>
                </table>
                <!-- end CTA text block --> 
              </td>
${(() => {
// START INTERPOLATION
            if (is_static && cta_design_type == 'side_images') {
              return `
              <td align="right" width="50"><a href="" target="_blank"><img src="https://via.placeholder.com/50x50/999999/ffffff?text=Max100+x+FLEX" alt="" width="50" height="auto" border="0" style="display: block"></a></td>`;
            } else if (!is_static){
              let typeOfCompare = `{{#if (compare ${group_id}_cta_style 'side_images')}}`;
              if (is_standard) { typeOfCompare = `{{#if ${group_id}_cta_left_right_image_boolean}}`;}
              return `${typeOfCompare}
              <td align="right" width="{{${group_id}_cta_right_image_width}}">{{#if ${group_id}_cta_link_url}}<a href="{{${group_id}_cta_link_url}}" data-managed-link="${group_id}_cta_link_url" target="_blank">{{/if}}<img agilecontent="true" src="{{${group_id}_cta_right_image_src_url}}" data-groupid="${group_id}_cta" alt="{{${group_id}_cta_right_image_alt_text}}" width="{{${group_id}_cta_right_image_width}}" height="auto" border="0" style="display: block">{{#if ${group_id}_cta_link_url}}</a>{{/if}}</td>{{/if}}`;
            } else {
              return '';
            }
// END INTERPOLATION
})()}
            </tr>
          </table>
          <!-- end BOX CTA -->`;
}














export function ctaHtml(data, is_static) {
  const { group_label, cta_design_type, cta_icon, is_standard } = data;
  let { group_id } = data;

  // in case '_cta' is in the group id since it's not needed
  group_id = group_id.replace('_cta', '');

  let style = {
    rtl: `{{#if is_rtl_text}}rtl{{else}}ltr{{/if}}`,
    color: `{{${group_id}_cta_color}}`,
    letterspacing: `{{${group_id}_cta_letter_spacing}}`,
    fontsize: ``,
    fontfamily: `{{${group_id}_cta_font_family}}`,
    texttransform: `{{${group_id}_cta_text_transform}}`,
    text: `{{{${group_id}_cta_text}}}`,
    weight: `{{${group_id}_cta_font_weight}}`,
    lineheight: `{{${group_id}_cta_line_height}}`,
    bgcolor: `{{${group_id}_cta_border_color}}`,
    cta_align: `{{${group_id}_cta_alignment}}`,
    padding: `{{${group_id}_cta_pad_top}}px {{${group_id}_cta_pad_right}}px {{${group_id}_cta_pad_bottom}}px {{${group_id}_cta_pad_left}}px`,
    cta_link: `{{${group_id}_cta_link_url}}`,
    cta_alt_text: `{{${group_id}_cta_alt_text}}`,
    cta_image_width: `{{${group_id}_cta_image_width}}`,
    cta_text_pad_topbottom: `{{${group_id}_cta_text_pad_topbottom}}`,
    cta_text_pad_leftright: `{{${group_id}_cta_text_pad_leftright}}`,
    cta_border_width: `{{${group_id}_cta_border_width}}`,
    text_align: `{{${group_id}_cta_text_alignment}}`,
    valign: `{{#if ${group_id}_cta_left_right_image_boolean}}middle{{else}}top{{/if}}`,
    cta_bgcolor: `{{#if ${group_id}_cta_bgcolor}}bgcolor="{{${group_id}_cta_bgcolor}}"{{/if}}`,
    cta_mobile_fontsize: `{{${group_id}_cta_mobile_fontsize}}`,
    cta_src_url: `{{${group_id}_cta_src_url}}`,

    table_class: `{{#if (compare ${group_id}_cta_width_type '!==' 'fluid')}}{{#if ${group_id}_cta_box_boolean}}{{${group_id}_cta_width}}{{else}}wrap{{/if}}{{else}}wrap{{/if}}`,

    cta_width: `{{#if (compare ${group_id}_cta_width_type 'fixed')}}{{#if full_boolean}}{{#if (compare ${group_id}_cta_width '<' ${group_id}_cta_max_val_margins)}}{{${group_id}_cta_width}}{{else}}100%{{/if}}{{else}}{{${group_id}_cta_width}}{{/if}}{{else if (compare ${group_id}_cta_width_type 'fluid')}}100%{{else}}auto{{/if}}`,
  };

  if (is_static) {
    style = {
      rtl: 'ltr',
      color: '#ffffff',
      letterspacing: 0,
      fontsize: '',
      fontfamily: 'Arial, Helvetica, sans-serif',
      texttransform: 'none',
      text: '<span style="font-size: 16px; line-height: 150%;">CTA Text</span>',
      weight: 400,
      lineheight: 150,
      bgcolor: '#cccccc',
      cta_align: 'center',
      padding: '0px 0px 0px 0px',
      cta_link: '',
      cta_alt_text: '',
      cta_image_width: '240',
      cta_text_pad_topbottom: 10,
      cta_text_pad_leftright: 20,
      cta_border_width: 5,
      text_align: 'center',
      valign: cta_design_type == 'side_images' ? 'middle' : 'top',
      cta_bgcolor: 'bgcolor="#da2128"',
      table_class: 'wrap',
      cta_width: 280,
      cta_mobile_fontsize: 'match',
      cta_src_url: 'https://via.placeholder.com/280x50/999999/ffffff?text=Max280+x+FLEX',

    };
  }

  return `
  ${!is_static ? '{{#if ' + group_id + '_cta_show}}' : ''}
    <!-- start ${group_label} -->
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="${style.cta_align}" valign="top" style="padding: ${style.padding};" class="pad20rl"> 
        <!-- start CTA block --> 
${(() => {
// START INTERPOLATION
    if (is_static) {
      // SHOW ONLY IMAGE VERSION
      if (cta_design_type == 'image') {
        return `<!-- start IMAGE CTA -->
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" class="wrap">
            <tr>
              <td align="center" valign="top"> 
                <!-- image --> 
                <a href="" target="_blank"><img src="https://via.placeholder.com/280x50/999999/ffffff?text=Static+Image" alt="" width="240" height="auto" border="0" style="display: block;"></a>
                <!-- end image --> 
              </td>
            </tr>
          </table>
          <!-- end IMAGE CTA -->`;
      // SHOW ONLY TEXT VERSION
      } else {
        return `${text_version(group_id,cta_design_type,cta_icon,style,true,is_standard).trim()}`
      } 
    // SHOW HANDLEBARS
    } else {
      let typeOfCompare = `{{#if (compare ${group_id}_cta_style 'image')}}`;
      if (is_standard) { typeOfCompare = `{{#if ${group_id}_cta_image_boolean}}` }
        return `${typeOfCompare}
          <!-- start IMAGE CTA -->
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" class="wrap">
            <tr>
              <td align="center" valign="top"> 
                <!-- image --> 
                {{#if ${group_id}_cta_link_url}}<a href="{{${group_id}_cta_link_url}}" data-managed-link="${group_id}_cta_link_url" target="_blank">{{/if}}<img agilecontent="true" src="{{${group_id}_cta_src_url}}" data-groupid="${group_id}_cta" alt="{{${group_id}_cta_alt_text}}" width="${style.cta_image_width}" height="auto" border="0" style="display: block">{{#if ${group_id}_cta_link_url}}</a>{{/if}}
                <!-- end image --> 
              </td>
            </tr>
          </table>
          <!-- end IMAGE CTA -->  
        {{else}}
          ${text_version(group_id,cta_design_type,cta_icon,style,false,is_standard).trim()}
        {{/if}}`
    }
// END INTERPOLATION
})()} 
        <!-- end CTA block --> 
        </td>
      </tr>
    </table>
    <!-- end ${group_label} -->
  ${!is_static ? '{{/if}}' : ''}
 `;
}
