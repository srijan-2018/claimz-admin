import React from 'react'
import { Global } from '@emotion/react'


const GlobalCss = () => {
  return (
    <Global
      styles={`
            .chakra-form__label{
              font-size: 13px !important;
              font-weight: 700 !important;
              color: var(--chakra-colors-claimzTextBlueLightColor) !important;
            }
            .chakra-input{
              height: 35px !important;
              font-size: 13px !important;
              border: 1px solid var(--chakra-colors-claimzBorderGrayColor) !important;
            }
            .chakra-input::placeholder{
              font-size: 13px !important;
            }
            .chakra-select{
              height: 35px !important;
              font-size: 13px !important;
              border: 1px solid var(--chakra-colors-claimzBorderGrayColor) !important;
            }
            .chakra-select::placeholder{
              font-size: 13px !important;
            }
            .disabled{
              opacity: 0.6;
              cursor: default;
              pointer-events: none;
            }
            .editable{
              opacity: 1;
              cursor: pionter;
              pointer-events: initial;
            }
            .p-datatable-emptymessage td{
              text-align: center !important;
            }
            .chakra-radio span{
              border-color: var(--chakra-colors-claimzTextBlueLightColor);
            }
            .p-multiselect-panel{
                z-index: 11111 !important;
            }
            .p-datatable .p-datatable-thead > tr > th{
                background: var(--chakra-colors-claimzMainGeadientColor);
                color: #fff;
                padding: 10px 10px;
            }
            .p-datatable .p-sortable-column:not(.p-highlight):not(.p-sortable-disabled):hover{
              background: var(--chakra-colors-claimzMainGeadientColor);
              color: #fff;
            }
            .p-datatable .p-sortable-column .p-sortable-column-icon{
              color: #fff
            }
            .p-datatable .p-sortable-column:not(.p-highlight):not(.p-sortable-disabled):hover .p-sortable-column-icon{
              color: #fff;
            }
            .recharts-wrapper{
              margin: 0 auto;
            }
            // media Query globally
            @media only screen and (max-width: 1023px) {

              }
            @media (min-width: 768px) and (max-width: 1023px) {

              }
            @media (min-width: 980px) and (max-width: 1023px) {
              }


        `}
    />
  )
}

export default GlobalCss
