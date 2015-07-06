var PB = PB || {};
PB.HASH_URL_TEMPLATE = "#why-is-{good_key}-better-than-{bad_key}";
PB.URL_FRAGMENTS = {
    RUN_BATTLE       : /^\#why-is-(.+)-better-than-(.+)/,
    SHOW_LIVEABILITY : /^\#live/,
    WHO_WE_ARE       : /^\#about/,
    SHOW_BATTLE      : /^$/
};
PB.Attributes = [];
PB.LGAs = [];
PB.env = "live"; // dev or live
