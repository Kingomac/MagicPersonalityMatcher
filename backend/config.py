
def get_config(entry:str|None=None):
    config = {}
    with open('x.cfg', 'r') as f:
        for line in f:
            sp = line.split('=')
            if len(sp) == 2:
                config[sp[0].strip()] = sp[1].strip()
                if entry and sp[0] == entry:
                    return sp[1].strip()
    print("Config loaded:")
    for k, v in config.items():
        print(f"{k}={v}")
    return config
