module.exports = {
  name: 'covid-stats',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/covid-stats',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
