/* eslint-disable global-require */
export default {
  welcome: {
    video1: require('./video1.mp4'),
    video2: require('./video2.mp4'),
    video3: require('./video3.mp4'),
    notification: require('./notification.mp4'),
    welcome: require('./Welcome.mp4')
  },
  onboarding: {
    no_nationality_still_in_work: require('./onboarding/no_nationality_still_in_work.mp4'),
    no_nationality_woman_lean: require('./onboarding/no_nationality_woman_lean.mp4'),
    connect_with_nationality: require('./onboarding/connect_with_nationality.mp4'),
    set_user_gender: require('./onboarding/set_user_gender.mp4'),
    profile_photo_camera: require('./onboarding/profile_photo_camera.mp4'),
    signUpMethods: require('./onboarding/sign_up_methods.mp4'),
    profile_photo_greetings: [
      require('./onboarding/profile_photo_greetings/greeting1.mp4'),
      require('./onboarding/profile_photo_greetings/greeting2.mp4'),
      require('./onboarding/profile_photo_greetings/greeting3.mp4'),
      require('./onboarding/profile_photo_greetings/greeting4.mp4'),
      require('./onboarding/profile_photo_greetings/greeting5.mp4')
    ]
  },
  forgotPassword: require('./onboarding/no_nationality_still_in_work.mp4'),
  city: {
    job: require('./jobs.mp4'),
    realEstate: require('./realEstate.mp4'),
    giveAndTake: require('./giveAndTake.mp4'),
    events: require('./events.mp4')
  },
  signIn: {
    welcomeBack: require('./signIn.mp4')
  }
};
