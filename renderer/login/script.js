document.querySelector('.img-btn').addEventListener('click', function()
	{
		document.querySelector('.cont').classList.toggle('s-signup')
	}
);
// l ipc
document.addEventListener('DOMContentLoaded', () => {
    const signInButton = document.getElementById('signInButton');

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            // Emit the 'signInButtonClicked' event to the main process
            require('electron').ipcRenderer.send('signInButtonClicked');
        });
    }
});

