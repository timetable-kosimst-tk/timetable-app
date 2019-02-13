import { css } from 'lit-element'

export default css`
  #sidebar {
    position: fixed;
    left: 0;
    top: 0;

    width: var(--app-sidebar-width);
    height: 100vh;

    background: var(--theme-sidebar-color);
  }

  #sidebar nav box-icon {
    --padding: 16px;

    width: calc(var(--app-sidebar-width) - 2 * var(--padding));
    height: calc(var(--app-sidebar-width) - 2 * var(--padding));

    margin: var(--padding);

    fill: white;
  }

  #sidebar nav > * {
    position: absolute;
  }

  #sidebar nav .center {
    top: 50%;
  }
`
