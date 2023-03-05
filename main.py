import random

def get_choices():
  player_choice = input("sten, sax, påse?:")
  options = [ "sten", "påse", "sax"]
  option = random.choice(options)
  computer_choice = option
  choices = {"player": player_choice, "computer": computer_choice}

  return choices

def check_win(player, computer):
  print(f"Du valde {player}, Datorn valde {computer}.")
  if player == computer: 
    return ("Oavgjort!") 
  elif player == "sten":
    if computer == "sax":
      return "Sten slår ut sax! Du vann!"
    else:
      return "Påse slår ut sten! Du förlora."
  elif player == "påse":
    if computer ==  "sten":
      return "Påse slår ut sten! Du vann!"
    else:
      return "Sax slår ut påse! Du förlora."
  elif player == "sax":
    if computer == "påse":
      return "Sax slår ut påse!, Du vann!"
    else:
      return "Sten slår ut sax! Du förlora."
    
choices = get_choices()
result = check_win(choices["player"], choices["computer"])
print (result)