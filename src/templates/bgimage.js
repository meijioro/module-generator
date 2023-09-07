/**
 * Compile final image fields code 
 * @param {string} module id
 * return {string} html
 */
export function bgImgFields(
  moduleId,
  groupId,
  groupLabel,
  brandStyle,
) {
  const isBrand = brandStyle ? "brand.image_styles.[JSON_KEY]" : '""';

  return `<!-- ${groupLabel} GROUP -->
  <cbn-group id="background" label="Background">
      
  <!-- Design Fields -->
  <cbn-text 
    id="instruction_design" 
    label="persistent instructions" 
    type="instruction" 
    default="<strong>Design</strong>">
  </cbn-text>
  <cbn-field 
    id="module_gradient_boolean" 
    label="Make Background a Gradient" 
    type="boolean" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "module_gradient_boolean" "false"}}}">
  </cbn-field>
  
  <!-- Gradient Fields -->
  <cbn-text 
    id="instruction_module_gradient" 
    label="persistent instructions" 
    type="instruction" 
    default="<strong><br>Gradient</strong>" 
    display_if="{{truthy module_gradient_boolean}}">
  </cbn-text>
  <cbn-field 
    id="module_gradient_color_1" 
    label="Color 1" 
    type="color" 
    enable-personalization="true" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "module_gradient_color_1" "#00CF92"}}}" 
    display_if="{{truthy module_gradient_boolean}}">
  </cbn-field>
  <cbn-field 
    id="module_gradient_color_2" 
    label="Color 2" 
    type="color" 
    enable-personalization="true" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "module_gradient_color_1" "#009CDE"}}}" 
    display_if="{{truthy module_gradient_boolean}}">
  </cbn-field>
  <cbn-field 
    id="module_gradient_fallback" 
    label="Fallback Background Color | Required for Outlook" 
    type="color" 
    enable-personalization="true" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "module_gradient_fallback" "#00CF92"}}}" 
    display_if="{{truthy module_gradient_boolean}}">
  </cbn-field>
  <cbn-field 
    id="module_gradient_direction" 
    label="Gradient Direction | top, bottom, left, right" 
    type="text" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "module_gradient_direction" "top"}}}" 
    display_if="{{truthy module_gradient_boolean}}">
  </cbn-field>
  
  <!-- Background Image Fields -->
  <cbn-text 
    id="instruction_module_bgimage" 
    label="persistent instructions" 
    type="instruction" 
    default="<strong><br>Desktop</strong>" 
    display_if="{{falsy module_gradient_boolean}}">
  </cbn-text>
  <cbn-field 
    id="background_src_url" 
    label="Image Source | FULL WIDTH: 640px width x flexible height; MARGINS: 600px width x flexible height" type="image" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "background_src_url" "https://via.placeholder.com/640x800/99ccff/999999/?text=Bkrd+Image+640+x+FLEX"}}}" 
    display_if="{{falsy module_gradient_boolean}}">
  </cbn-field>
  <cbn-field 
    id="background_fallback" 
    label="Fallback Background Color | Required for Android" type="color" 
    enable-personalization="true" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "background_fallback" "#FFFFFF"}}}" 
    display_if="{{falsy module_gradient_boolean}}">
  </cbn-field>
  <cbn-field 
    id="background_image_repeat" 
    label="Image Repeat" 
    type="select" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "background_image_repeat" "no-repeat"}}}" 
    display_if="{{falsy module_gradient_boolean}}">
    <cbn-option value="select">Select Image Repeat</cbn-option>
    <cbn-option value="no-repeat">no-repeat</cbn-option>
    <cbn-option value="repeat">repeat</cbn-option>
    <cbn-option value="repeat-y">repeat-y</cbn-option>
    <cbn-option value="repeat-x">repeat-x</cbn-option>
  </cbn-field>
  
  <!-- Padding Fields -->
  <cbn-text 
    id="instruction_bg_padding" 
    label="persistent instructions" 
    type="instruction" 
    default="<strong><br>Padding | px</strong>">
  </cbn-text>
  <cbn-field 
    id="background_pad_top" 
    label="Top" 
    type="integer" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "background_pad_top" "0"}}}">
  </cbn-field>
  <cbn-field 
    id="background_pad_bottom" 
    label="Bottom" 
    type="integer" 
    default="{{{brandvalue brand.custom_modules "" "${moduleId}" "background_pad_bottom" "0"}}}">
  </cbn-field>
</cbn-group>`;
}

/**
 * Compile final image html code
 * @param {string} module id
 * return {string} html
 */
export function bgImgHtml(groupId, groupLabel) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
  <tr>
    <td background="{{img_scaled_src_url}}" bgcolor="{{img_bgcolor}}" valign="bottom" width="600" style="background-position: top center; background-size: cover;" class="hide_bgimage">
      <!--[if gte mso 9]>
      <v:rect
        xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px; height: 410px;">
        <v:fill type="frame" src="{{img_scaled_src_url}}" color="{{img_bgcolor}}" />
        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
      <![endif]-->
          
        <!-- YOUR CONTENT GOES HERE -->
          
      <!--[if gte mso 9]>
      </v:textbox>
    </v:rect>
    <![endif]-->
    </td>
  </tr>
</table>`;
}

<td class="bgAdjust" width="100%" align="center" valign="top" background="{{background_src_url}}" bgcolor="{{background_fallback}}" style="background-position: top center; background-repeat: {{background_image_repeat}}">


<!--[if gte mso 9]>
  <v:rect 
    xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px; height: auto; background-position: top center; background-repeat: {{background_image_repeat}};">
<v:fill type="frame" src="{{background_src_url}}" color="{{background_fallback}}"/>     
<v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">/v:rect>
<![endif]-->