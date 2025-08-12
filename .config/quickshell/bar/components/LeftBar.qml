import QtQuick 6.5
import QtQuick.Layouts 6.5
import QtQuick.Controls 6.5
import "../../" // go up twice to reach colors.qml

RowLayout {
    id: leftBar
    spacing: 8

    // Start menu placeholder
    Rectangle {
        width: 32
        height: 32
        radius: 8
        color: Colors.accent
        Text {
            anchors.centerIn: parent
            text: "≡"
            color: Colors.textPrimary
            font.bold: true
            font.pointSize: 14
        }
        MouseArea {
            anchors.fill: parent
            onClicked: console.log("Start menu clicked")
        }
    }

    // Workspace bubbles placeholder
    RowLayout {
        spacing: 4
        Repeater {
            model: 5 // number of workspaces
            Rectangle {
                width: 24
                height: 24
                radius: 12
                color: index === 0 ? Colors.accent : Colors.bgDark
                Text {
                    anchors.centerIn: parent
                    text: (index + 1).toString()
                    color: Colors.textPrimary
                    font.pointSize: 10
                }
                MouseArea {
                    anchors.fill: parent
                    onClicked: console.log("Switch to workspace", index + 1)
                }
            }
        }
    }
}
