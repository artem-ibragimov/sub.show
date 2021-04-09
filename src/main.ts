import { FileGetter } from 'src/components/FileGetter';
import { PlayerComponent } from 'src/components/PlayerCmp';
import { PlayerController } from 'src/core/PlayerCtrl';
import { UserActions } from 'src/components/UserActions';

//#region settings

const video_el = document.querySelector('video#video_el') as HTMLVideoElement;

const primary_sub_el = video_el.querySelector('#primary_sub_el') as HTMLTrackElement;
const secondary_sub_el = video_el.querySelector('#secondary_sub_el') as HTMLTrackElement;

const player_cmp = new PlayerComponent(video_el, primary_sub_el, secondary_sub_el);
const player_ctrl = new PlayerController();
player_cmp.on('onseeked', player_ctrl.onseeked);
player_cmp.on('timeupdate', player_ctrl.timeupdate);
player_ctrl.on('state_change', player_cmp.state_change);

const user_actions = new UserActions();
user_actions.on('stepback', player_ctrl.stepback);

const step_size_inpt = document.querySelector('#step_size_inpt') as HTMLInputElement;
step_size_inpt.onchange = () => {
   player_ctrl.set_step_size(parseInt(step_size_inpt.value, 10));
};

const choose_video_btn = document.querySelector('input#choose_video_btn') as HTMLInputElement;
const choose_video_label = document.querySelector('label[for=choose_video_btn] h2') as HTMLHeadingElement;
new FileGetter(choose_video_btn).on('choose', (video) => {
   const local_file = FileGetter.toObjectURL(video);
   const info = FileGetter.getFileInfo(video);
   player_cmp.set_video_local_source(local_file, info);
   choose_video_label.innerText += ' ✅';
});

const choose_primary_sub_btn = document.querySelector('#choose_primary_sub_btn') as HTMLInputElement;
const choose_primary_sub_label = document.querySelector('label[for=choose_primary_sub_btn] h2') as HTMLHeadingElement;
new FileGetter(choose_primary_sub_btn).on('choose', (sub) => {
   const local_file = FileGetter.toObjectURL(sub);
   player_cmp.set_primary_sub_local_source(local_file);
   choose_primary_sub_label.innerText += ' ✅';
});

const choose_secondary_sub_btn = document.querySelector('#choose_secondary_sub_btn') as HTMLInputElement;
const choose_secondary_sub_label = document.querySelector('label[for=choose_secondary_sub_btn] h2') as HTMLHeadingElement;
new FileGetter(choose_secondary_sub_btn).on('choose', (sub) => {
   const local_file = FileGetter.toObjectURL(sub);
   player_cmp.set_secondary_sub_local_source(local_file);
   choose_secondary_sub_label.innerText += ' ✅';
});

//#endregion