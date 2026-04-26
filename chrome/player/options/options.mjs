import {OptionsStore} from './OptionsStore.mjs';
let Options = {};

async function loadOptions(newOptions) {
    newOptions = newOptions || OptionsStore.get();
    Options = newOptions;

    const autoplayCheckbox = document.getElementById('enableAutoplay');
    const fullscreenCheckbox = document.getElementById('enableFullscreen');

    autoplayCheckbox.checked = Options.enableAutoplay || false;
    fullscreenCheckbox.checked = Options.enableFullscreen || false;

    autoplayCheckbox.addEventListener('change', () => {
        Options.enableAutoplay = autoplayCheckbox.checked;
        optionChanged();
    });

    fullscreenCheckbox.addEventListener('change', () => {
        Options.enableFullscreen = fullscreenCheckbox.checked;
        optionChanged();
    });
}

function optionChanged() {
    OptionsStore.replace(Options);
}

OptionsStore.init().then(() => {
    loadOptions();
});
