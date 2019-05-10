interface Window {
  $http: any;
  $api: any;
  $commonErrorHandler: (args) => any;
  $showLoading: (args) => void;
  $hideLoading: () => void;
}
