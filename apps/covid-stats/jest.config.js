module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/covid-stats',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  displayName: 'covid-stats',
};
