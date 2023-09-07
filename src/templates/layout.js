/**
 *
 * @param {*} num 
 * @returns
 */
function trWrap(num) {
  // less than 2 items do nothing
  if (num < 2) { return '[ELEMENT HERE]'}
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(`
    <tr>
      <td> [ELEMENT HERE] </td>
    </tr>`);
  } 
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${arr.join('')} 
  </table>`;
}

/**
 * 
 * @param {boolean} has_gutter 
 * @param {boolean} is_top_level 
 * @returns 
 */
function two_col(has_gutter, is_top_level, flip, elementRows) {
  let width = '50%';
  if (has_gutter) {
    width = `${ is_top_level ? '48.333333%' : '{{#if hide_gutter}}50%{{else}}48.333333%{{/if}}' }`;
  }

  // RETURN HTML
  return ` 
          <table role="presentation" align="center" width="100%" cellpadding="0" cellspacing="0" border="0" ${!is_top_level && flip ? '{{#if flip_to_right}}dir="rtl"{{/if}}' : ''}>
            <tr>
              <th width="${width}" align="left" class="colsplit" style="vertical-align: top; padding: 0px; font-weight: normal;" dir="ltr">         

              ${trWrap(elementRows.col1)} 
              
              </th>
${( () => { 
// START INTERPOLATION
              if (!has_gutter) { return '' }
  
              return `${!is_top_level ? '{{#ifNone hide_gutter}}' : ''}
              <!-- gutter -->
              <th width="3.333333%" valign="top" style="width: 3.333333%; padding: 0px; vertical-align: top;" class="nomob"><img src="https://images.harmony.epsilon.com/ContentHandler/images?id=3f67ada7-a01e-4c02-ab71-8b46fd3106ae" width="20" height="20" style="display: block;" border="0" alt="" /></th>
              <!-- end gutter -->
              ${!is_top_level ? '{{/ifNone}}' : ''}`;
// END INTERPOLATION
})()}  
              <th width="${width}" align="left" class="colsplit" style="vertical-align: top; padding: 0px; font-weight: normal;" dir="ltr">
                
              ${trWrap(elementRows.col2)}

              </th>
            </tr>
          </table>
    `;
}

/**
 * 
 * @param {boolean} has_gutter 
 * @param {boolean} is_top_level 
 * @returns 
 */
function three_col(has_gutter, is_top_level, elementRows) {
  //let width = `${is_top_level ? '213.33' : '{{#if full_boolean}}200{{else}}213.33{{/if}}'}`; //33.333333%
  let width = '33.333333%';

  let gutter_html = '';
  if (has_gutter) {
    //width = `${is_top_level ? '200' : '{{#if full_boolean}}{{#if hide_gutter}}200{{else}}188{{/if}}{{else}}{{#if hide_gutter}}213.33{{else}}200{{/if}}{{/if}}'}`;
    width = `${is_top_level ? '31.25%' : '{{#if hide_gutter}}33.333333%{{else}}31.25%{{/if}}'}`;

    // ${is_top_level ? '20' : '{{#if full_boolean}}20{{else}}18{{/if}}'}
    gutter_html = `
        ${!is_top_level ? '{{#ifNone hide_gutter}}' : ''}
        <!-- gutter -->
        <th width="3.125%" align="left" valign="top" style="padding: 0px; vertical-align: top;" class="hide"><img src="https://images.harmony.epsilon.com/ContentHandler/images?id=3f67ada7-a01e-4c02-ab71-8b46fd3106ae" width="${is_top_level ? '18' : '{{#if full_boolean}}20{{else}}18{{/if}}'}" height="20" style="display: block;" border="0" alt="" /></th>
        <!-- end gutter -->
        ${!is_top_level ? '{{/ifNone}}' : ''}
    `;
  }

  return `
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th width="${width}" align="center" valign="top" class="colsplit" style="font-weight: normal; vertical-align: top;"> 
        <!-- start left content -->                    
        
          ${trWrap(elementRows.col1)}     
            
        </th>
        <!-- end left content -->
        ${gutter_html}
        <!-- start middle content -->  
        <th width="${width}" align="center" valign="top" class="colsplit" style="font-weight: normal; vertical-align: top;"> 

          ${trWrap(elementRows.col2)}
        
        </th>
        <!-- end middle content --> 
        ${gutter_html}
        <!-- start right content -->
        <th width="${width}" align="center" valign="top" class="colsplit" style="font-weight: normal; vertical-align: top;"> 

          ${trWrap(elementRows.col3)}
        
        </th>
        <!-- end right content --> 
      </tr>
    </table>
    `;
}

/**
 * 
 * @param {boolean} has_gutter 
 * @param {boolean} is_top_level 
 * @returns 
 */
function four_col(has_gutter, is_top_level, elementRows) {
  // let width = '50%';
  // //let width = side_margins ? 150 : 160;
  // let gutter_html = '';

  // if (has_gutter) {
  //   width = `${is_top_level ? '48.0891719745%' : '{{#if hide_gutter}}50%{{else}}48.0891719745%{{/if}}'}`;
  //   //width = side_margins ? 141 : 151;
  //   gutter_html = `
  //             ${!is_top_level ? '{{#ifNone hide_gutter}}' : ''}
  //             <!-- gutter -->
  //             <td width="12" valign="top" style="padding: 0px; vertical-align: top; width: 12px;"><img src="https://images.harmony.epsilon.com/ContentHandler/images?id=3f67ada7-a01e-4c02-ab71-8b46fd3106ae" width="12" height="20" style="display: block;" border="0" alt=""/></td>
  //             <!-- end gutter -->
  //             ${!is_top_level ? '{{/ifNone}}' : ''}
  //   `;
  // }

  let colpad = function(dir) {
    if (is_top_level && has_gutter) {
      return `padding-${dir}: 6px`;
    } else if (!is_top_level && has_gutter) {
      return `padding-${dir}: {{#if hide_gutter}}0{{else}}6{{/if}}px`
    } else {
      return '';
    } 
  }

  return `
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <th width="50%" align="center" class="colsplit pad0r" style="vertical-align: top; font-weight: normal; ${colpad('right')}"> 
          <!-- start content 1 & 2 -->
          
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <!-- start content 1 -->
              <td width="50%" align="center" valign="top" style="${colpad('right')}">
                ${trWrap(elementRows.col1)}
              </td>
              <!-- end content 1 -->

              <!-- start content 2 -->
              <td width="50%" align="center" valign="top" style="${colpad('left')}">
                ${trWrap(elementRows.col2)}
              </td>
              <!-- end content 2 -->
            </tr>
          </table>
          
          <!-- end content 1 & 2 --> 
        </th>
        <th width="50%" align="center" class="colsplit pad0l" style="vertical-align: top; font-weight: normal; ${colpad('left')}">
          <!-- start content 3 & 4 -->
          <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <!-- start content 3 -->  
              <td width="50%" align="center" valign="top" style="${colpad('right')}">
                ${trWrap(elementRows.col3)}
              </td>
              <!-- end content 3 -->

              <!-- start content 4 -->
              <td width="50%" align="center" valign="top" style="${colpad('left')}">
                ${trWrap(elementRows.col4)}
              </td>
              <!-- end content 4 -->
            </tr>
          </table>
          <!-- end content 3 & 4 --> 
        </th>
      </tr>
    </table>`;
}



/**
 *
 * @returns
 */
function htmlContent(data, is_top_level) {
  const { module_id, module_name, side_margins, column_num, gutter, flip, elementRows } = data;
  const id_no_dash = module_id.replace('-', '');

  return `<!-- Start ${module_id}: ${module_name} --> 
  <section id="${id_no_dash}" layout-row="true">
    <div layout-row="true">
      <table layout-row="true" role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" ${( () => { // START INTERPOLATION
        if (is_top_level) {
          return `bgcolor="#ffffff"`
        } else {
          return `bgcolor="{{module_bgcolor}}"{{#if mobile_module_hide}} class="nomob"{{/if}}`;
        }
      // END INTERPOLATION
      })()}>
        <tr layout-row="true">
${( () => { 
// START INTERPOLATION
        if (is_top_level) {
          return `<td align="center" valign="top" style="padding: ${side_margins ? '0px 20px 0px 20px' : '0px 0px 0px 0px'}">`
        } else {
          if (side_margins) {
            return `
            {{~#if full_boolean~}}
              <td align="center" valign="top" style="padding: {{pad_top}}px 20px {{pad_bottom}}px 20px;">
            {{~else~}}
              <td align="center" valign="top" style="padding: {{pad_top}}px 0px {{pad_bottom}}px 0px;"> 
            {{~/if~}}`;
          } else {
            return `
              <td align="center" valign="top" style="padding: {{pad_top}}px 0px {{pad_bottom}}px 0px;">`;
          }
        }
// END INTERPOLATION
})()}
${( () => {  
// START INTERPOLATION
  switch (column_num) {
    case '2':
      return two_col(gutter, is_top_level, flip, elementRows[0]).trim();
      break;
    case '3':
      return three_col(gutter, is_top_level, elementRows[0]).trim();
      break;
    case '4':
      return four_col(gutter, is_top_level, elementRows[0]).trim();
      break;
    default:
      return `${trWrap(elementRows[0].col1)}`;
      break;
  }
// END INTERPOLATION
})()}
          </td>
        </tr>
      </table>
    </div>
  </section>
  <!-- End ${module_id}: ${module_name} -->`;
}

/**
 * 
 * @param {json} data 
 * @param {boolean} is_top_level 
 * @returns 
 */
function hbsLayout(data, is_top_level) {
  const { module_id, module_name, custom_css, flip, gutter, side_margins } = data;
  const id_no_dash = module_id.replace('-', '');
  const colorPattern = "^#([0-9a-fA-F]{6}){1,2}$|^\\$\\{?([a-zA-Z0-9_.-]*)}";

  return `
<cbn-module id="${id_no_dash}" description="${module_id}: ${module_name}" category="content" schema="2" build="1">
  <cbn-meta>
    <!-- MODULE SETTINGS GROUP -->  
    <cbn-group id="module_settings" label="Module Settings">
      ${side_margins || gutter || flip ? `<!-- DESIGN -->
      <cbn-text 
        id="module_settings_PRIMARY_LABEL_design" 
        label="persistent instructions" 
        type="instruction" 
        default="<strong>DESIGN</strong>">
      </cbn-text>` : ''}
${(() => {
// START INTERPOLATION
      if (!side_margins) { return ''}
      return `
      <cbn-field 
        id="full_boolean" 
        label="Add Side Margins" 
        type="boolean" 
        default="{{brandvalue brand.custom_modules brand.email_settings.full_boolean "${module_id}" "full_boolean" "false"}}">
      </cbn-field>`;
// END INTERPOLATION
})()}     
${(() => {
// START INTERPOLATION
      if (!gutter) { return ''} 
      return `
      <cbn-field 
        id="hide_gutter" 
        label="Hide Gutter"
        type="boolean" 
        default="{{brandvalue brand.custom_modules "" "${module_id}" "hide_gutter" "false"}}">
      </cbn-field>`;
// END INTERPOLATION
})()}
${(() => {
// START INTERPOLATION
      if (!flip) { return '' }
      return `<cbn-field 
        id="flip_to_right" 
        label="Move [ITEM] to the Right" 
        type="boolean" 
        default="false">
      </cbn-field>`
// END INTERPOLATION
})()}
      <!-- OUTSIDE BOX -->
      <cbn-text 
        id="module_settings_PRIMARY_LABEL_outside_box"
        label="persistent instructions"
        type="instruction" 
        default="<br><strong>OUTSIDE BOX</strong> | 640px table">
      </cbn-text>
      <cbn-field 
        id="module_bgcolor" 
        label="Background Color" 
        type="color" 
        enable-personalization="true"
        validation-pattern="${colorPattern}" 
        pattern-validation-message="enter a valid six digit hex code starting with #" 
        required="true" 
        default="{{brandvalue brand.custom_modules brand.email_settings.module_bgcolor "${module_id}" "module_bgcolor" "#ffffff"}}">
      </cbn-field>

      <!-- CONTENT POSITION -->
      <cbn-text
        id="module_settings_PRIMARY_LABEL_content_position"
        label="persistent instructions"
        type="instruction"
        default="<br><strong>CONTENT POSITION</strong>">
      </cbn-text>
      <cbn-text
        id="module_settings_SECONDARY_LABEL_content_padding"
        label="persistent instructions"
        type="instruction"
        default="<strong>Padding</strong> | px format">
      </cbn-text>
      <cbn-field
        id="pad_top"
        label="Top"
        type="integer"
        whole-number="true"
        default="{{brandvalue brand.custom_modules "" "${module_id}" "pad_top" "0"}}">
      </cbn-field>
      <cbn-field
        id="pad_bottom"
        label="Bottom"
        type="integer"
        whole-number="true"
        default="{{brandvalue brand.custom_modules "" "${module_id}" "pad_bottom" "0"}}">
      </cbn-field>

      <!-- RESPONSIVE -->
      <cbn-text 
        id="module_settings_PRIMARY_LABEL_responsive" 
        label="persistent instructions"
        type="instruction" 
        default="<br><strong>RESPONSIVE</strong>">
      </cbn-text>
      <cbn-field 
        id="mobile_module_hide" 
        label="Hide" 
        type="boolean" 
        default="{{{brandvalue brand.custom_modules "" "${module_id}" "mobile_module_hide" "false"}}}">
      </cbn-field>

      <!-- TEXT DIRECTION -->
      <cbn-text
        id="module_settings_PRIMARY_LABEL_text_direction"
        label="persistent instructions"
        type="instruction"
        default="<br><strong>TEXT DIRECTION</strong>">
      </cbn-text>
      <cbn-field
        id="is_rtl_text"
        label="Right to Left"
        type="boolean"
        default="false">
      </cbn-field>
${(() => {
// START INTERPOLATION
      if (!custom_css) { return '' }
      return `<!-- CUSTOM CSS -->
      <cbn-field id="module_css" label="This is css" type="css" 
        default="
        /* ${module_id}: ${module_name} */
        @media only screen and (max-width: 480px) {
          [CUSTOM CSS HERE]
        }
      " 
      display="false"></cbn-field>`;
// END INTERPOLATION
})()}

    </cbn-group>
    
    [CBN-GROUP FIELDS HERE]
      
  </cbn-meta>
          
  <cbn-output type="Email/HTML">
  ${htmlContent(data, is_top_level)}     
  </cbn-output>

</cbn-module>`;
}

/**
 * 
 * @param {json} data 
 * @param {boolean} is_top_level 
 * @returns string
 */
function topLevelLayout(data, is_top_level) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial scale=1.0" />
  <meta name="robots" content="no index" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="format-detection" content="address=no" />

  <!--[if !mso]><!-->
  <!--<![endif]-->

  <title>Harmony Internal - Carbon Production</title>
  <style type="text/css">
  .ReadMsgBody {
    width: 100%;
  }
  .ExternalClass {
    width: 100%;
  }
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
    line-height: 100%;
  }
  body {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    margin: 0 auto !important;
    padding: 0;
    min-width: 100% !important;
  }
  td {
    mso-line-height-rule: exactly;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
  }
  img {
    margin: 0 !important;
  }
  /* Forces Outlook to honor line-height */
  div, p, a, li, td, span {
    -webkit-text-size-adjust: none;
  }
  /* Hides preheader on Outlook */
  .set_outlook_hidden {
    display: none !important;
  }
  /* Overrides blue links */
  a[href^=tel], #MessageViewBody a, a[x-apple-data-detectors], #body a, .link {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  /* Wraps bullet proof button */
  a.button {
    border-left: 0px !important;
    border-right: 0px !important;
    display: block !important;
    width: 100% !important;
  }
  [data-outlook-cycle] [x-apple-data-detectors-type="calendar-event"] {
    color: inherit !important;
    -webkit-text-decoration-color: inherit !important;
    text-decoration: none !important;
  }
  /*Stops Outlook iOS blue dates*/
  #body [x-apple-data-detectors=true],
  a[x-apple-data-detectors=true] {
    color: inherit !important;
    -webkit-text-decoration-color: inherit !important;
    text-decoration: inherit !important;
  }  
  /* Default superscript code */
  sup {
    -webkit-text-size-adjust: none;
    vertical-align: text-top .6em;
    line-height: .6em;
    font-size: 60%;
  }
  /* Default subscript code */
  sub {
    -webkit-text-size-adjust: none;
    vertical-align: text-bottom .9em;
    line-height: .9em;
    font-size: 60%;
  }
  .yshortcuts a {
    border-bottom: none !important;
  }
  /* Renders TH on yahoo */
  .undoreset th {
    padding: 1px !important;
  }
  /* Extra classes */
  .margin0 {
    margin: 0 auto !important;
  }
  .nowrap {
    white-space: nowrap !important;
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  
  /* STYLES FOR ROUNDED BORDER BUTTONS */
  @media screen and (max-device-width: 600px), screen and (max-width: 600px){
    .wrapto100pc {
      width: 100% !important;
      height: auto !important;
    }
    .nomob_rounded {
      display: none !important;
      width: 0px !important;
      height: 0px !important;
    }
  }
  u + #body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  u + #body .nomob_rounded {
    display: none!important;
    width: 0px!important;
    height: 0px!important;
  }
  u + #body .gmailbutton {
    width: 100% !important;
  }

  /* STYLES FOR RESPONSIVE */
  @media only screen and (max-width: 480px) {
  /* SHOW ON RESPONSIVE */
    .mobile_show {
      display: block !important;
      width: auto !important;
      overflow: visible !important;
      float: none !important;
      max-height: none !important;
      line-height: normal !important;
      height: auto !important;
    }
    /* HIDE ON RESPONSIVE */
    .nomob, .hide {
      display: none !important;
    }
    /* RESPONSIVE BACKGROUND IMAGE */
    .bgAdjust {
      background-position: top center;
    }
    .hide_bgimage {
      background-image: none !important;
      height: auto !important;
      width: 100% !important;
    }
    /* ALIGNS OBJECTS ON RESPONSIVE */
    .center {
      text-align: center !important;
    }
    .left {
      text-align: left !important;
    }
    .right {
      text-align: right !important;
    }
    /* WRAP & RESIZE ON RESPONSIVE */
    .wrap {
      width: 100% !important;
      height: auto !important;
      min-width: 100% !important;
    }
    .wrap-existing-content {
      height: auto !important;
      display: block;
    }
    .resize280 {
      width: 280px !important;
      height: auto !important;
    }
    /* SPLIT COLUMNS ON RESPONSIVE */
    .colsplit {
      width: 100% !important;
      float: inherit !important;
      display: block !important;
      background-position: top center !important;
    }
    /* STACK IMAGE TOP OR BOTTOM ON RESPONSIVE */
    th.topstack {
      display: table-header-group !important;
    }
    th.botstack {
      display: table-footer-group !important;
    }
    /* Inlines objects on responsive */
    .inline {
      display: inline-block !important;
    }
    /* RESPONSIVE PADDING STYLES - 0 or 20 */
    .pad0 {
      padding: 0px !important;
    }
    .pad0t {
      padding-top: 0px !important;
    }
    .pad0r {
      padding-right: 0px !important;
    }
    .pad0b {
      padding-bottom: 0px !important;
    }
    .pad0l {
      padding-left: 0px !important;
    }
    .pad0rl {
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
    .pad0tb {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
    .pad20 {
      padding: 20px !important;
    }
    .pad20t {
      padding-top: 20px !important;
    }
    .pad20r {
      padding-right: 20px !important;
    }
    .pad20b {
      padding-bottom: 20px !important;
    }
    .pad20l {
      padding-left: 20px !important;
    }
    .pad20rl {
      padding-right: 20px !important;
      padding-left: 20px !important;
    }
    .pad20tb {
      padding-top: 20px !important;
      padding-bottom: 20px !important;
    }
  }

  /* REMOVES RIGHT GUTTER IN GMAIL IOS APP */
  @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    /* iPhone 5 and 5S */
    .email-container {
      min-width: 320px !important;
    }
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    /* iPhone 6 and 6+ */
    .email-container {
      min-width: 375px !important;
    }
  }

  /* STYLES FOR RESPONSIVE FONT SIZES */
  @media only screen and (max-width: 480px) {
    td .mobile_h1, td .mobile_h1 span {
      font-size: 40px !important;
      line-height: 120% !important;
    }
    td .mobile_h2, td .mobile_h2 span {
      font-size: 30px !important;
      line-height: 120% !important;
    }
    td .mobile_h3, td .mobile_h3 span {
      font-size: 24px !important;
      line-height: 120% !important;
    }
    td .mobile_h4, td .mobile_h4 span {
      font-size: 20px !important;
      line-height: 120% !important;
    }
    td .mobile_p1, td .mobile_p1 span {
      font-size: 16px !important;
      line-height: 150% !important;
    }
    td .mobile_p2, td .mobile_p2 span {
      font-size: 14px !important;
      line-height: 150% !important;
    }
    td .mobile_p3, td .mobile_p3 span {
      font-size: 12px !important;
      line-height: 150% !important;
    }
    td .mobile_cta, td .mobile_cta span {
      font-size: 16px !important;
      line-height: 150% !important;
    } 
  }

  @media only screen and (max-width:480px) {
    [data-personalization_mapping] {
    position: relative;
  }
  [data-personalization_mapping] .personalization-placeholder-value, [data-personalization_mapping] .personalization-placeholder-value * {
    color: inherit;
    font-weight: inherit;
    background-color: rgba(56, 240, 115, 0.14902);
  }
  [data-personalization_mapping] .personalization-script-value, [data-personalization_mapping] .personalization-styling-el {
    display: none;
  }
  [data-personalization_mapping] .personalization-tooltip-el {
    display: none;
    width: max-content;
    position: absolute;
    left: 10%;
    top: 100%;
    z-index: 10000;
    padding: 8px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 8px 0 rgba(122, 133, 148, 0.3);
  }
  [data-personalization_mapping] .personalization-tooltip-el .personalization-tooltip-el-row {
    font-size: 12px;
    display: block;
    padding-bottom: 8px;
    clear: both;
    line-height: 18px;
  }
  [data-personalization_mapping] .personalization-tooltip-el .personalization-tooltip-el-row .personalization-tooltip-label {
    color: #7a8594;
    display: inline;
    float: left;
    font-size: 12px !important;
    line-height: 18px !important;
  }
  [data-personalization_mapping] .personalization-tooltip-el .personalization-tooltip-el-row .personalization-tooltip-friendly-name, [data-personalization_mapping] .personalization-tooltip-el .personalization-tooltip-el-row .personalization-tooltip-default-value {
    font-weight: 600;
    color: #333;
    display: inline;
    float: left;
    font-size: 12px !important;
    line-height: 18px !important;
  }
  [data-personalization_mapping]:hover .personalization-tooltip-el {
    display: inherit;
  }
}
</style>
<!--[if mso | ie]>
<style>
  .sup {
    vertical-align: 1px !important;
    font-size: 100% !important;
  }
</style>
<![endif]-->

<!--[if ie]>
<style>
.sup {
  vertical-align: 5px !important;
  font-size: 77% !important;
}
</style>
<![endif]-->

<!--[if gt mso 15]>
<style type="text/css" media="all">
  /* Outlook 2016 Height Fix */
  table, tr, th, td {border-collapse: collapse;}
  tr { font-size:0px; line-height:0px; border-collapse: collapse; }
</style>
<![endif]-->

<!--[if gte mso 9]><xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml><![endif]-->

</head>

<body id="body" background="" style="margin:0 !important; padding:0 !important; width: 100% !important; background-color: #f4f5f6; background-size: ; background-repeat: ; " class="body">

<!--START -- Page Overflow Color Table -->
<div style="background-color: #f4f5f6;"> 

<!--[if gte mso 9]>
	<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
	<v:fill type="tile" src="" color="#f4f5f6"/>
	</v:background>
	<![endif]-->

    <table role="presentation" height="100%" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" class="email-container">
      <tr>
        <td align="left" background="" style="vertical-align: top; background-size: ; background-repeat: ;" valign="top">
				<!--START -- Email Background Color Table  -->

          <table role="presentation" width="640" border="0" align="center" cellpadding="0" cellspacing="0"  class="wrap">
            <tr>
						  <td align="center" data-wrapper>
					    	<!--START Email Size Wrapper Table -->
                  <table role="presentation" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="wrap">${htmlContent(data, is_top_level)}</table>
							  <!--END Email Size Wrapper Table -->
              </td>
            </tr>
          </table>

        <!--END Email Background Color Table -->
        </td>
      </tr>
	  </table>

    </div>
<!--END Page Overflow Color Table -->
</body>
</html>`;
}

/**
 * Compile final image fields code
 * @param {object} data
 * @param {boolean} is_top_level
 * return {string} html
 */
export const generateLayout = (data, is_top_level) => {
  // return final html
  return `${
    is_top_level
      ? topLevelLayout(data, is_top_level) //is static
      : hbsLayout(data, is_top_level) //is dynamic
  }`;
};
