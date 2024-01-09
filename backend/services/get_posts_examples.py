import pandas as pd

num_personality = {
    1: 'ISTJ',
    2: 'ISFJ',
    3: 'INFJ',
    4: 'INTJ',
    5: 'ISTP',
    6: 'ISFP',
    7: 'INFP',
    8: 'INTP',
    9: 'ESTP',
    10: 'ESFP',
    11: 'ENFP',
    12: 'ENTP',
    13: 'ESTJ',
    14: 'ESFJ',
    15: 'ENFJ',
    16: 'ENTJ'
}

df = pd.read_csv('datasets/dataset_definitivo.csv')
df['personality'] = df['personality'].apply(lambda x: num_personality[x])
# drop rows with post with less than 100 characters
df = df[df['post'].apply(lambda x: len(x) > 30 and len(x) < 1000)]
print("Examples dataset loaded")

def get_posts_examples(n: int):
    global df
    sample = df.sample(n=n)
    return sample.values.tolist()


if __name__ == '__main__':
    while True:
        input("Press Enter to get posts examples...")
        print(get_posts_examples())
