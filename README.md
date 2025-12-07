<div align="center">

# Re-HolyNotes v1.0.0

Holy Notes allows you to save and organize Discord messages into notebooks. This plugin enhances your Discord experience by providing a robust system to store important messages, categorize them, and easily revisit them whenever needed.

## Features

- **Save Messages:** Easily save any Discord message to a designated notebook.
- **Multiple Notebooks:** Create and manage various notebooks to categorize your saved messages.
- **Search & Sort:** Efficiently find your notes within notebooks using search functionality and multiple sorting options (by date added or message date, ascending or descending).
- **Move Notes:** Move individual notes between different notebooks.
- **Jump to Message:** Quickly navigate back to the original location of a saved message in Discord.
- **Import/Export Notes:** Backup and restore your notes by importing or exporting them as JSON files.
- **Delete Notes/Notebooks:** Manage your saved data by deleting individual notes or entire notebooks.
- **Configurable Settings:** Adjust plugin behavior, such as the overscan count for message rendering in the notebook view.
- **Context Menu Integration:** Right-click on any message to access options for adding it to a notebook.
- **Header Bar Button:** Access your notes directly from a convenient button in the Discord header bar.
- **Message Popover Button:** Quickly save messages to your default "Main" notebook.

## Installing

**Vencord:**

<div align="left">
1.  Follow the Vencord install guide here: https://docs.vencord.dev/intro/<br>
2.  Place the plugin inside the userplugins folder (e.g., `vencord/src/userplugins`)<br>
3.  Run `pnpm build` and `pnpm inject` again in your Vencord root directory.<br>
4.  Enable the plugin in Discord settings.

## Usage

### Saving a Note

- **From Context Menu:** Right-click on a message, hover over "Add Message To", and select the desired notebook.
- **From Message Popover:** Hover over a message and click the "Save Note" button to quickly save it to the "Main" notebook.

### Accessing Notebooks

- Click the "Holy Notes" button in the Discord header bar.
- Use the "Open Notes" action from your client mod's toolbox.

### Managing Notes

- **Notebook Tabs:** Switch between your different notebooks using the tabs at the top of the notes modal.
- **Search:** Use the search bar to filter notes by content.
- **Sort:** Utilize the sorting options at the bottom of the modal to arrange notes by date added or message date, in ascending or descending order.
- **Delete Note:** Right-click a note and select "Delete Note", or hold the `DELETE` key and click on a note.
- **Move Note:** Right-click a note, hover over "Move Note", and select the target notebook.
- **Jump to Message:** Right-click a note and select "Jump To Message" to go to the original message.

### Managing Notebooks

- **Create Notebook:** In the notes modal, click the "Create Notebook" button (when "Main" is selected) and enter a name for your new notebook.
- **Delete Notebook:** Select the notebook you wish to delete, then click the "Delete Notebook" button. Be aware that this will delete all notes within that notebook.

### Import/Export

- **Export Notes:** Within the Help Modal (accessed via the help icon in the notes modal), click "Export Notes" to save all your notes to a `notes.json` file.
- **Import Notes:** Within the Help Modal, click "Import Notes" to load notes from a `notes.json` file.

## Settings

The plugin offers the following configurable setting:

- **Overscan Count:** Adjust the number of messages rendered above and below the visible area in the notebook view for performance optimization. (Found in client mod settings under Re-HolyNotes)

## Author

- Wolfie (EquicordDevs)
