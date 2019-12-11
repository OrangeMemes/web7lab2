module.exports = {
    "transform": {
        "^.+\\.[j]sx?$": "babel-jest"
    },
    "transformIgnorePatterns": [
        "/node_modules/(?!antd|rc-pagination|rc-calendar|rc-util|rc-tooltip|css-animation).+\\.js$"
    ]

};
