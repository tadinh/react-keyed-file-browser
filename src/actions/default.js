import React from 'react'
import PropTypes from 'prop-types'

const Actions = (props) => {
  const {
    selectedItem,
    isFolder,
    icons,
    nameFilter,

    canCreateFolder,
    onCreateFolder,

    canRenameFile,
    onRenameFile,

    canRenameFolder,
    onRenameFolder,

    canDeleteFile,
    onDeleteFile,

    canDeleteFolder,
    onDeleteFolder,

    canDownloadFile,
    onDownloadFile,

  } = props

  let actions = []

  if (selectedItem) {
    // Something is selected. Build custom actions depending on what it is.
    if (selectedItem.action) {
      // Selected item has an active action against it. Disable all other actions.
      let actionText
      switch (selectedItem.action) {
        case 'delete':
          actionText = 'Deleting ...'
          break

        case 'rename':
          actionText = 'Renaming ...'
          break

        default:
          actionText = 'Moving ...'
          break
      }

      actions = (
        // TODO: Enable plugging in custom spinner.
        <div className="item-actions">
          {icons.Loading} {actionText}
        </div>
      )
    } else {
      if (isFolder && canCreateFolder && !nameFilter) {
        actions.push(
          <li key="action-add-folder">
            <a
              onClick={onCreateFolder}
              href="#"
              role="button"
            >
              {icons.Folder}
              &nbsp;Add Subfolder
            </a>
          </li>
        )
      }

      if (selectedItem.keyDerived && !isFolder && canRenameFile) {
        actions.push(
          <li key="action-rename">
            <a
              onClick={onRenameFile}
              href="#"
              role="button"
            >
              {icons.Rename}
              &nbsp;Rename
            </a>
          </li>
        )
      } else if (selectedItem.keyDerived && isFolder && canRenameFolder) {
        actions.push(
          <li key="action-rename">
            <a
              onClick={onRenameFolder}
              href="#"
              role="button"
            >
              {icons.Rename}
              &nbsp;Rename
            </a>
          </li>
        )
      }

      if (selectedItem.keyDerived && !isFolder && canDeleteFile) {
        actions.push(
          <li key="action-delete">
            <a
              onClick={onDeleteFile}
              href="#"
              role="button"
            >
              {icons.Delete}
              &nbsp;Delete
            </a>
          </li>
        )
      } else if (selectedItem.keyDerived && isFolder && canDeleteFolder) {
        actions.push(
          <li key="action-delete">
            <a
              onClick={onDeleteFolder}
              href="#"
              role="button"
            >
              {icons.Delete}
              &nbsp;Delete
            </a>
          </li>
        )
      }

      if (!isFolder && canDownloadFile) {
        actions.push(
          <li key="action-download">
            <a
              onClick={onDownloadFile}
              href="#"
              role="button"
            >
              {icons.Download}
              &nbsp;Download
            </a>
          </li>
        )
      }

      if (actions.length) {
        actions = (<ul className="item-actions">{actions}</ul>)
      } else {
        actions = (<div className="item-actions">&nbsp;</div>)
      }
    }
  } else {
    // Nothing selected: We're in the 'root' folder. Only allowed action is adding a folder.
    if (canCreateFolder && !nameFilter) {
      actions.push(
        <li key="action-add-folder">
          <a
            onClick={onCreateFolder}
            href="#"
            role="button"
          >
            {icons.Folder}
            &nbsp;Add Folder
          </a>
        </li>
      )
    }

    if (actions.length) {
      actions = (<ul className="item-actions">{actions}</ul>)
    } else {
      actions = (<div className="item-actions">&nbsp;</div>)
    }
  }

  return actions
}

Actions.propTypes = {
  selectedItem: PropTypes.object,
  isFolder: PropTypes.bool,
  icons: PropTypes.object,
  nameFilter: PropTypes.string,

  canCreateFolder: PropTypes.bool,
  onCreateFolder: PropTypes.func,

  canRenameFile: PropTypes.bool,
  onRenameFile: PropTypes.func,

  canRenameFolder: PropTypes.bool,
  onRenameFolder: PropTypes.func,

  canDeleteFile: PropTypes.bool,
  onDeleteFile: PropTypes.func,

  canDeleteFolder: PropTypes.bool,
  onDeleteFolder: PropTypes.func,

  canDownloadFile: PropTypes.bool,
  onDownloadFile: PropTypes.func,
}

Actions.defaultProps = {
  selectedItem: null,
  isFolder: false,
  icons: {},
  nameFilter: '',

  canCreateFolder: false,
  onCreateFolder: null,

  canRenameFile: false,
  onRenameFile: null,

  canRenameFolder: false,
  onRenameFolder: null,

  canDeleteFile: false,
  onDeleteFile: null,

  canDeleteFolder: false,
  onDeleteFolder: null,

  canDownloadFile: false,
  onDownloadFile: null,
}

export default Actions
