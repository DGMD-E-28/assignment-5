# Battleship Game

## Assignment Overview
This project is part of **DGMD E-28: Developing Single Page Web Applications**. It recreates a simplified Battleship game using **JavaScript**, **HTML**, and **CSS**, with a focus on working with JavaScript objects and external JSON configuration.

---

## Requirements

Technologies used:

- **HTML** to create the game structure  
- **CSS** for styling and layout  
- **JavaScript** for interactive logic using object-oriented design  
- **JSON** for ship placement configuration

---

## 📌 Tasks

### 🔹 Game Setup

- Create a **6x6 grid** using JavaScript and the DOM
- Ship data (orientation, size, and position) is loaded from an external JSON file (`battleship.json`)
- Ships are not randomized, but set from the JSON file

### 🔹 Gameplay Logic

- The game places **3 ships**:
  - One of size 2
  - One of size 3
  - One of size 4
- Ships may be horizontal or vertical
- User clicks a cell to guess
  - "💢 Hit!" for a correct partial hit
  - "🔥 You sunk a ship!" when all cells of a ship are hit
  - "🌊 Miss!" when no ship occupies that cell
- The player gets **20 guesses max**
- Game ends on win or when guesses run out

### 🔹 Visual Indicators

- Unselected = blank  
- Hit = red square with 💥  
- Miss = grey square with 🌊  
- On game over, all remaining ship positions are revealed with 🚢

---

## 🚀 Deliverables

- `index.html`
- `styles.css`
- `script.js`
- `battleship.json`

---

## 💡 Reflection Questions

1. **Of the object variations we have learned, which feels the most useful to you?**  
   Using arrays of ship objects with methods and properties felt the most useful because it allowed me to group related data and logic together for each ship.

2. **What was the easiest part of this assignment?**  
   Building the grid with CSS Grid and generating it dynamically with JavaScript was straightforward and satisfying.

---

## 🔗 Resources

- [MDN - JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)  
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)  

---

## Project Details

- **Author:** Elizabeth Koch  
- **Date:** Fri Apr 4, 2025  
- **Live URL:** *https://dgmd-e-28.github.io/assignment-5/*  

---

Happy Coding! 🚢🎯