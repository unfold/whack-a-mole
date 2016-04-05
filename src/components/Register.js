/* eslint-disable max-len */

import React, { Component, PropTypes } from 'react'
import FillViewportHeight from './FillViewportHeight'
import AvatarPicker from './AvatarPicker'
import look, { StyleSheet } from 'react-look'
import Button from './Button'
import cssEase from 'css-ease'

let styles

@look
export default class Register extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  }

  state = {
    showAvatarPicker: false,
  }

  onSelectAvatar(avatar) {
    this.props.onRegister({
      score: 0,
      avatar,
    })
  }

  onSelectAvatar = ::this.onSelectAvatar

  showAvatarPicker() {
    this.setState({ showAvatarPicker: !this.state.showAvatarPicker })
  }

  showAvatarPicker = ::this.showAvatarPicker

  render() {
    return (
      <FillViewportHeight>
        <div className={styles.register}>
          <div className={styles.test}>
          </div>
          <svg className={styles.unfoldLogo} viewBox="0 0 142 23" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.022 1.054c-.003-.129.061-.313.362-.318l6.194-.008c.325 0 .325 0 .325.275l.013 7.922s8.315-5.438 13.871-8.691c.461-.248.427-.061.433.311l.034 20.917c.004.313.003.374-.361.376l-6.259.012c-.326.003-.295-.034-.295-.378l-.013-7.883s-8.741 5.686-13.908 8.781c-.227.151-.363.152-.362-.185-.012-8.278-.019-11.725-.036-21.131zM55.315 21.85c-.298 0-.33.03-.33-.435-.009-5.928-.022-13.405-.032-20.26-.005-.406-.003-.438.33-.441l15.885-.027c.291 0 .256.064.258.312.005 1.372.01 3.401.008 4.611 0 .253.032.28-.259.284l-8.552.014.044 4.083 7.667-.011c.256-.001.226.124.226.369 0 1.31.004 3.665.008 5.133.003.28.031.309-.26.312l-7.675.012s.011 3.318.012 5.591c.003.345-.031.435-.295.435l-7.037.016zM95.296 11.278c.008 6.604-5.652 11.262-12.009 11.271-7.009.011-12.031-4.904-12.041-11.264-.008-6.7 5.456-11.262 12.007-11.274 6.261-.008 12.031 4.315 12.044 11.266zm-16.184-.04c0 2.591 1.707 4.084 4.165 4.08 2.362-.006 4.161-1.571 4.153-4.091-.001-2.397-1.642-3.893-4.166-3.889-2.556.005-4.156 1.627-4.152 3.9zM112.345 21.471c.001.248-.028.28-.325.28l-15.328.025c-.33.003-.335.035-.338-.277 0-3.865-.01-7.046-.014-10.258l-.02-10.32c0-.31 0-.278.328-.28l6.981-.012c.295.004.326.032.326.282.005 2.432.022 15.061.022 15.061l7.998-.016c.296 0 .36.059.362.312l.007 5.203zM134.245 8.05c-.983-4.869-4.489-7.465-10.799-7.452l-9.595.015c-.297.001-.327.065-.326.31.014 7.919.021 12.629.037 20.547-.002.312.033.275.322.274l8.784-.012c3.682-.005 6.205-.891 8.45-2.227l10.203-6.472-.014-9.537-7.062 4.554zm-11.727 7.823l-1.503.005-.013-9.414 1.572-.005c2.326-.007 4.095 1.211 4.106 4.608.005 3.643-1.964 4.802-4.162 4.806zM.36 6.723l.016 9.514 9.095-5.813.005 3.747c.004 4.795 3.847 8.532 10.272 8.52 7.066-.015 10.767-3.229 10.758-8.248l-.023-13.464c0-.219 0-.219-.164-.222l-7.108.01c-.229 0-.232.035-.229.224l.02 12.092c.004 2.149-1.011 2.995-2.747 2.996-1.77.004-2.751-.864-2.761-2.984l-.018-12.066c0-.251-.227-.251-.227-.251l-7.645.015-9.245 5.929z" />
          </svg>

          <svg className={styles.whackAMoleLogo} viewBox="0 0 260 174" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.775 171.359c0 1.094-.916 1.641-2.748 1.641-2.68 0-5.031-.82-7.055-2.461-2.461-1.969-3.691-4.689-3.691-8.162 0-4.648 1.969-9.666 5.906-15.053 3.637-5.004 7.424-8.463 11.361-10.377.656-.301 1.251-.451 1.784-.451.533 0 .978.014 1.333.041.902.082 1.572.424 2.01 1.025-1.641 3.391-3.076 6.809-4.307 10.254 3.281-3.035 7.287-5.646 12.018-7.834 4.922-2.27 9.365-3.404 13.33-3.404 1.805 0 2.707 1.094 2.707 3.281 0 1.504-.383 3.486-1.148 5.947 4.566-4.184 9.611-7.014 15.135-8.49 1.859-.492 3.541-.738 5.045-.738s2.529.212 3.076.636c.547.424.861.998.943 1.723.082.725-.021 1.572-.308 2.543-.287.971-.677 2.003-1.169 3.097-.492 1.094-1.039 2.215-1.641 3.363-.602 1.148-1.162 2.256-1.682 3.322-1.23 2.57-1.846 4.457-1.846 5.66 0 2.242 1.217 3.363 3.65 3.363 2.898 0 5.742-1.955 8.531-5.865.82-1.121 1.613-2.256 2.379-3.404.711-.055 1.196.082 1.456.41.26.328.39.69.39 1.087 0 .396-.171 1.019-.513 1.866-.342.848-.848 1.941-1.518 3.281s-1.47 2.721-2.399 4.143c-.93 1.422-1.996 2.823-3.199 4.204-1.203 1.381-2.557 2.618-4.061 3.712-3.363 2.379-7.068 3.568-11.115 3.568-4.348 0-7.273-1.572-8.777-4.717-.492-1.012-.738-2.256-.738-3.732 0-1.477.294-3.049.882-4.717.588-1.668 1.306-3.274 2.153-4.819.848-1.545 1.743-2.987 2.687-4.327.943-1.34 1.771-2.502 2.481-3.486.711-.984 1.217-1.764 1.518-2.338.301-.574.232-.861-.205-.861-1.914 0-4.361 1.176-7.342 3.527-2.926 2.242-5.359 4.785-7.301 7.629-2.816 7.41-4.225 12.346-4.225 14.807 0 .492.021.916.062 1.271.041.355-.034.636-.226.841-.191.205-.451.362-.779.472-1.313.52-2.851.588-4.614.205-1.764-.383-3.124-.916-4.081-1.6-2.16-1.531-3.24-4.033-3.24-7.506 0-4.73 2.557-10.377 7.67-16.939 1.531-1.996 2.215-2.994 2.051-2.994-2.105 0-5.223 1.326-9.352 3.979-4.293 2.762-7.383 5.564-9.27 8.408-1.23 4.922-1.9 9.912-2.01 14.971zM206.721 37.223c-2.078-1.094-3.917-1.641-5.517-1.641-1.6 0-3.049.362-4.348 1.087s-2.44 1.675-3.425 2.851c-2.078 2.488-3.117 5.25-3.117 8.285 0 2.297.82 4.102 2.461 5.414 1.504 1.258 3.719 1.887 6.645 1.887 2.926 0 5.804-.868 8.634-2.604 2.83-1.736 5.312-4.231 7.444-7.485 1.23-.082 1.846.424 1.846 1.518 0 .438-.335 1.456-1.005 3.056-.67 1.6-1.88 3.575-3.63 5.927-1.75 2.352-3.773 4.43-6.07 6.234-4.977 3.91-10.391 5.865-16.242 5.865-4.73 0-8.449-1.217-11.156-3.65-2.734-2.461-4.102-6.002-4.102-10.623 0-3.609 1.422-7.232 4.266-10.869 2.652-3.418 6.002-6.221 10.049-8.408 4.129-2.242 7.984-3.363 11.566-3.363 1.941 0 3.445.328 4.512.984 1.859 1.148 2.789 2.242 2.789 3.281 0 1.121-.533 1.873-1.6 2.256z" />
            <path d="M85.602 67c-5.961 0-8.941-3.404-8.941-10.213 0-5.77 3.186-13.152 9.557-22.148 5.605-7.902 11.676-14.52 18.211-19.852 4.129-3.363 7.178-5.045 9.146-5.045 1.449 0 2.734.67 3.855 2.01 1.23 1.422 1.846 2.878 1.846 4.368 0 1.49-.321 2.83-.964 4.02-.643 1.189-1.504 2.386-2.584 3.589-1.08 1.203-2.352 2.393-3.814 3.568-1.463 1.176-3.015 2.283-4.655 3.322-3.391 2.188-6.713 3.828-9.967 4.922-1.176 2.598-2.338 5.482-3.486 8.654 5.523-4.977 11.963-8.449 19.318-10.418 2.352-.629 4.334-.943 5.947-.943 1.613 0 2.584.28 2.912.841.328.561.39 1.306.185 2.235-.205.93-.595 1.982-1.169 3.158-.574 1.176-1.162 2.393-1.764 3.65-1.504 3.254-2.256 5.578-2.256 6.973 0 2.871.916 4.307 2.748 4.307 2.023 0 4.279-.916 6.768-2.748 2.215-1.668 4.156-3.746 5.824-6.234 1.23-.082 1.846.424 1.846 1.518 0 .875-.567 2.29-1.702 4.245s-2.249 3.644-3.343 5.065c-1.094 1.422-2.324 2.823-3.691 4.204-1.367 1.381-2.83 2.604-4.389 3.671-3.5 2.434-6.863 3.65-10.09 3.65-3.227 0-5.517-.827-6.87-2.481-1.354-1.654-2.03-4.026-2.03-7.116 0-3.965 2.393-8.928 7.178-14.889 1.477-1.832 2.119-2.748 1.928-2.748-2.188 0-5.51 1.367-9.967 4.102-4.73 2.898-8.066 5.742-10.008 8.531-1.121 4.402-1.791 8.6-2.01 12.592 0 1.094-1.189 1.641-3.568 1.641zm13.986-36.217c3.527-1.613 6.562-3.541 9.105-5.783 2.543-2.297 3.814-4.279 3.814-5.947 0-.82-.157-1.579-.472-2.276-.314-.697-.725-1.046-1.23-1.046-.506 0-1.155.369-1.948 1.107-.793.738-1.682 1.764-2.666 3.076-2.078 2.734-4.279 6.357-6.604 10.869z" />
            <path d="M151.309 60.438c-3.746 4.375-8.312 6.563-13.699 6.563-3.418 0-6.152-1.025-8.203-3.076-2.023-2.023-3.035-4.689-3.035-7.998 0-4.184 1.641-8.244 4.922-12.182 3.172-3.828 7.328-6.945 12.469-9.352 5.332-2.488 10.842-3.732 16.529-3.732 2.16 0 3.705.342 4.635 1.025.738-.875 1.401-1.388 1.989-1.538.588-.15 1.046-.226 1.374-.226 1.039 0 2.146.15 3.322.451-.109.355-.342.964-.697 1.825-.355.861-.752 1.88-1.189 3.056-.438 1.176-.902 2.461-1.395 3.855-1.777 4.977-2.666 8.702-2.666 11.177 0 2.475.779 3.712 2.338 3.712 2.023 0 4.279-.916 6.768-2.748 2.215-1.668 4.156-3.746 5.824-6.234 1.23-.082 1.846.424 1.846 1.518 0 .93-.567 2.352-1.702 4.266-1.135 1.914-2.235 3.568-3.302 4.963-1.066 1.395-2.256 2.762-3.568 4.102-1.313 1.34-2.707 2.543-4.184 3.609-3.309 2.352-6.535 3.527-9.68 3.527-3.992 0-6.672-1.203-8.039-3.609-.438-.738-.656-1.388-.656-1.948v-1.005zm-11.73-11.197c0 3.172 1.326 4.758 3.979 4.758 2.926 0 6.371-2.365 10.336-7.096 2.105-2.516 3.944-4.922 5.517-7.219 1.572-2.297 2.769-4.047 3.589-5.25-6.836.055-12.51 1.613-17.021 4.676-4.266 2.898-6.398 6.275-6.398 10.131z" />
            <path d="M117.348 173.205l-.82.041c-4.32 0-7.615-1.066-9.885-3.199-2.133-1.996-3.199-4.703-3.199-8.121 0-4.703 1.873-9.201 5.619-13.494 3.637-4.156 8.053-7.068 13.248-8.736-.164-1.23.287-2.242 1.354-3.035.766-.574 2.03-.861 3.794-.861 1.764 0 3.466.164 5.106.492 1.641.328 3.295 1.053 4.963 2.174 3.609 2.379 5.414 5.578 5.414 9.598 0 4.348-1.08 8.477-3.24 12.387 4.703-1.012 8.818-4.156 12.346-9.434 1.23-.082 1.846.424 1.846 1.518 0 .438-.137.971-.41 1.6-3.719 8.832-11.156 14.684-22.313 17.555-3.992 1.039-8.531 1.559-13.617 1.559l-.205-.041zm-.697-17.965c0 3.172 1.326 4.758 3.979 4.758 2.242 0 4.498-1.354 6.768-4.061 2.379-2.816 3.568-5.674 3.568-8.572 0-2.953-1.422-4.908-4.266-5.865-4.895 1.367-8.025 4.43-9.393 9.188-.438 1.449-.656 2.967-.656 4.553z" />
            <path d="M179.568 115.988c3.035 0 4.553 2.557 4.553 7.67 0 6.754-4.102 13.891-12.305 21.41-3.117 2.871-6.398 5.346-9.844 7.424.355 4.211 1.9 6.617 4.635 7.219.875.191 1.907.287 3.097.287 1.189 0 2.475-.157 3.855-.472 1.381-.314 2.755-.827 4.122-1.538 3.035-1.559 5.564-3.883 7.588-6.973 1.23-.082 1.846.424 1.846 1.518 0 .438-.294 1.354-.882 2.748-.588 1.395-1.675 3.206-3.261 5.435-1.586 2.229-3.486 4.245-5.701 6.05-5.086 4.156-10.732 6.234-16.939 6.234-7.164 0-11.498-3.062-13.002-9.188-.492-1.914-.738-4.054-.738-6.419 0-2.365.355-4.751 1.066-7.157.711-2.406 1.668-4.792 2.871-7.157s2.604-4.683 4.204-6.952c1.6-2.27 3.295-4.402 5.086-6.398 1.791-1.996 3.616-3.835 5.476-5.517 1.859-1.682 3.664-3.138 5.414-4.368 3.746-2.57 6.699-3.855 8.859-3.855zm-17.596 31.541c4.594-2.871 8.463-6.316 11.607-10.336 3.199-4.074 4.799-7.67 4.799-10.787 0-1.559-.328-2.68-.984-3.363-.219-.246-.602-.369-1.148-.369-.547 0-1.312.349-2.297 1.046-.984.697-1.996 1.647-3.035 2.851-1.039 1.203-2.058 2.618-3.056 4.245-.998 1.627-1.907 3.356-2.728 5.188-1.805 4.129-2.857 7.971-3.158 11.525z" />
            <path d="M48.113 68.23c-6.207 0-9.311-3.951-9.311-11.854 0-3.609.656-8.121 1.969-13.535-7.875 11.484-15.9 19.031-24.076 22.641-2.898 1.285-5.824 1.928-8.777 1.928-3.5 0-5.824-1.531-6.973-4.594-.355-.902-.533-2.133-.533-3.691 0-1.559.273-3.466.82-5.722.547-2.256 1.265-4.539 2.153-6.85.889-2.311 1.9-4.635 3.035-6.973 1.135-2.338 2.297-4.621 3.486-6.85 1.189-2.229 2.345-4.382 3.466-6.46 3.883-7.191 5.824-11.997 5.824-14.417s-1.477-3.63-4.43-3.63c-3.309 0-6.74 1.736-10.295 5.209-.875.875-1.559 1.654-2.051 2.338-1.613-.848-2.42-1.723-2.42-2.625 0-.902.253-1.743.759-2.522.506-.779 1.189-1.531 2.051-2.256.861-.725 1.846-1.401 2.953-2.03 1.107-.629 2.263-1.189 3.466-1.682 2.543-1.012 4.826-1.518 6.85-1.518h.205c5.004 0 8.312 1.805 9.926 5.414.793 1.723 1.189 3.705 1.189 5.947s-.198 4.525-.595 6.85c-.396 2.324-.93 4.71-1.6 7.157s-1.319 4.751-1.948 6.911c-1.613 5.414-2.42 8.627-2.42 9.639 0 2.16.807 3.24 2.42 3.24 2.324 0 5.66-2.297 10.008-6.891 4.676-4.977 9.16-11.252 13.453-18.826.957-2.324 2.099-5.216 3.425-8.675 1.326-3.459 2.181-5.66 2.563-6.604.383-.943.848-1.675 1.395-2.194.547-.52 1.121-.916 1.723-1.189.957-.492 1.941-.738 2.953-.738 1.012 0 1.613.328 1.805.984.191.656.178 1.463-.041 2.42-.438 1.887-1.312 3.951-2.625 6.193-2.488 10.336-3.732 19.687-3.732 28.055 0 6.645.971 9.967 2.912 9.967 3.391 0 7.396-2.939 12.018-8.818 4.457-5.66 7.943-12.059 10.459-19.195 1.75-4.922 2.625-9.167 2.625-12.735 0-3.568-.697-6.31-2.092-8.224 1.121-.957 2.153-1.436 3.097-1.436.943 0 1.736.226 2.379.677.643.451 1.169 1.046 1.579 1.784.793 1.395 1.189 3.24 1.189 5.537 0 2.297-.328 5.004-.984 8.121-.656 3.117-1.579 6.33-2.769 9.639-1.189 3.309-2.598 6.651-4.225 10.028-1.627 3.377-3.418 6.624-5.373 9.741s-4.033 6.029-6.234 8.736c-2.201 2.707-4.464 5.072-6.788 7.096-4.977 4.32-9.598 6.48-13.863 6.48zm174.44-2.871c0 1.094-.923 1.641-2.769 1.641s-3.391-.185-4.635-.554c-1.244-.369-2.235-.964-2.974-1.784-1.422-1.531-2.133-4.156-2.133-7.875 0-5.961 3.062-13.398 9.188-22.313 3.473-5.031 6.761-9.16 9.864-12.387 3.104-3.227 5.53-5.592 7.28-7.096 3.801-3.281 6.48-4.922 8.039-4.922 1.094 0 2.133.492 3.117 1.477-5.25 5.141-9.994 11.252-14.232 18.334-1.559 2.598-2.994 5.346-4.307 8.244 4.676-3.582 9.488-5.934 14.438-7.055 1.559-.355 3.021-.533 4.389-.533 2.625 0 3.938 1.203 3.938 3.609 0 2.27-1.408 4.936-4.225 7.998-2.434 2.625-5.141 4.758-8.121 6.398.602 1.75 1.299 3.097 2.092 4.04.793.943 1.825 1.415 3.097 1.415 1.271 0 2.488-.253 3.65-.759s2.304-1.169 3.425-1.989c2.215-1.668 4.156-3.746 5.824-6.234 1.23-.082 1.846.424 1.846 1.518 0 .875-.567 2.29-1.702 4.245s-2.249 3.644-3.343 5.065c-1.094 1.422-2.324 2.823-3.691 4.204-1.367 1.381-2.83 2.604-4.389 3.671-3.5 2.434-6.932 3.65-10.295 3.65-5.414 0-8.271-4.853-8.572-14.561-.027-1.34-.055-2.57-.082-3.691 3.336-1.258 6.269-2.68 8.798-4.266 2.529-1.586 4.313-2.789 5.353-3.609 2.352-1.914 3.527-3.541 3.527-4.881 0-.602-.328-.902-.984-.902-.656 0-1.422.144-2.297.431-.875.287-1.859.684-2.953 1.189-1.094.506-2.249 1.114-3.466 1.825-1.217.711-2.413 1.49-3.589 2.338-2.652 1.969-4.689 3.91-6.111 5.824-1.887 6.07-2.885 12.168-2.994 18.293zm-96.695 48.078c-3.746 4.375-8.312 6.563-13.699 6.563-3.418 0-6.152-1.025-8.203-3.076-2.023-2.023-3.035-4.689-3.035-7.998 0-4.184 1.641-8.244 4.922-12.182 3.172-3.828 7.328-6.945 12.469-9.352 5.332-2.488 10.842-3.732 16.529-3.732 2.16 0 3.705.342 4.635 1.025.738-.875 1.401-1.388 1.989-1.538.588-.15 1.046-.226 1.374-.226 1.039 0 2.146.15 3.322.451-.109.355-.342.964-.697 1.825-.355.861-.752 1.88-1.189 3.056-.438 1.176-.902 2.461-1.395 3.855-1.777 4.977-2.666 8.702-2.666 11.177 0 2.475.779 3.712 2.338 3.712 2.023 0 4.279-.916 6.768-2.748 2.215-1.668 4.156-3.746 5.824-6.234 1.23-.082 1.846.424 1.846 1.518 0 .93-.567 2.352-1.702 4.266-1.135 1.914-2.235 3.568-3.302 4.963-1.066 1.395-2.256 2.762-3.568 4.102-1.313 1.34-2.707 2.543-4.184 3.609-3.309 2.352-6.535 3.527-9.68 3.527-3.992 0-6.672-1.203-8.039-3.609-.438-.738-.656-1.388-.656-1.948v-1.005zm-11.73-11.197c0 3.172 1.326 4.758 3.979 4.758 2.926 0 6.371-2.365 10.336-7.096 2.105-2.516 3.944-4.922 5.517-7.219 1.572-2.297 2.769-4.047 3.589-5.25-6.836.055-12.51 1.613-17.021 4.676-4.266 2.898-6.398 6.275-6.398 10.131zm81.478 54.641c1.586 2.844 5.182 4.266 10.787 4.266 3.5 0 6.802-.854 9.905-2.563 3.104-1.709 5.763-4.231 7.978-7.567 1.23-.082 1.846.424 1.846 1.518 0 1.23-.731 3.001-2.194 5.312-1.463 2.311-2.83 4.177-4.102 5.599-1.271 1.422-2.693 2.741-4.266 3.958-1.572 1.217-3.261 2.263-5.065 3.138-3.91 1.914-8.025 2.871-12.346 2.871-8.695 0-14.342-2.406-16.939-7.219-.93-1.75-1.395-3.753-1.395-6.009 0-2.256.39-4.327 1.169-6.214.779-1.887 1.853-3.685 3.22-5.394 1.367-1.709 2.994-3.288 4.881-4.737 1.887-1.449 3.937-2.693 6.152-3.732 4.703-2.27 9.502-3.404 14.396-3.404 3.527 0 5.947 1.107 7.26 3.322.465.766.697 1.784.697 3.056 0 1.271-.321 2.522-.964 3.753-.643 1.23-1.511 2.345-2.604 3.343-1.094.998-2.365 1.873-3.814 2.625-1.449.752-2.994 1.401-4.635 1.948-2.898.984-6.221 1.695-9.967 2.133zm-.574-3.814c3.5-.41 6.508-1.381 9.023-2.912 2.652-1.641 3.979-3.562 3.979-5.763s-1.012-3.302-3.035-3.302c-2.625 0-4.908 1.258-6.85 3.773-1.859 2.406-2.898 5.141-3.117 8.203z" />
          </svg>

          <Button className={styles.button} onClick={this.showAvatarPicker}>
            Join tournament
          </Button>

          <AvatarPicker
            visible={this.state.showAvatarPicker}
            onSelectAvatar={this.onSelectAvatar}
          />
        </div>
      </FillViewportHeight>
    )
  }
}

styles = StyleSheet.create({
  register: {
    padding: '1em 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  unfoldLogo: {
    width: '7.8em',
    fill: '#FD0042',
    transition: `.4s opacity ${cssEase['ease-in-cubic']}`,

    'showAvatarPicker=true': {
      opacity: 0,
    },
  },

  whackAMoleLogo: {
    width: '16em',
    fill: '#420B36',
    margin: '3em 0 4em',
    transition: `.4s opacity ${cssEase['ease-in-cubic']}`,

    'showAvatarPicker=true': {
      opacity: 0,
    },
  },

  button: {
    transition: `.7s transform ${cssEase['ease-in-expo']}, .7s opacity ${cssEase['ease-in-cubic']}`,

    'showAvatarPicker=true': {
      opacity: 0,
      transform: 'translate3d(0, 1em, 0)',
    },
  },
})
