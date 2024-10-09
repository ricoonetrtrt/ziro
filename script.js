const playPauseButton = document.getElementById('play-pause');
const message = document.getElementById("message-button");
const musicCover = document.querySelector('.music-cover');
const contact = document.querySelector('.contact-info');
const icon = document.querySelector(".icon-3d");
const container = document.querySelector(".container");
const notification = document.getElementById('notification');
const rand = [{
        title: "Judas",
        artist: "JJK - Lady Gaga",
        name: "starboy.mp3",
        color: "red",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYcRXEFYCupso37y089xr3v0Ui0r1yyQVMSg&usqp=CAU"
    },
    {
        title: "Legends Never Die",
        artist: "League of Legends",
        name: "onecall.mp3",
        color: "green",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmD5nDlRUbHkIQEPc4zcMXsd5xYQhWJsmzX-kcJszYRKmO4rVKxCkIaKVp&s=10"
    },
    {
        title: "Night Changes",
        artist: "One - Direction",
        name: "yad.mp3",
        color: "blue",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32IKdfrqvAudx5MjM3DRMeXBKuzbmmqmwXxjJo4PTOxxnjhYNQyTEMEg&s=10"
    }
];
const music = rand[Math.floor(Math.random() * rand.length)];

musicCover.src = music.img;
document.querySelector(".music-title").innerHTML = music.title;
document.querySelector(".music-artist").innerHTML = music.artist;

let isPlaying = false;
const audio = new Audio("./languages/" + music.name);
let rotation = 0;
let interval;

const startRotation = () => {
    interval = setInterval(() => {
        rotation = (rotation + 1) % 360;
        musicCover.style.transform = `rotate(${rotation}deg)`;
    }, 20);
};

const stopRotation = () => {
    clearInterval(interval);
    const currentRotation = rotation;
    const duration = (360 - currentRotation) / 360; // calculate duration based on remaining degrees
    const step = () => {
        rotation += 1;
        if (rotation >= 360) {
            rotation = 0;
            musicCover.style.transform = `rotate(0deg)`;
            return;
        }
        musicCover.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();

        musicCover.style.boxShadow = '';
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        stopRotation();


    } else {
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play();
        });
        musicCover.style.boxShadow = `0 0 10px ${music.color}, 0 0 20px ${music.color}, 0 0 30px ${music.color}`;

        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        startRotation();
    }
    isPlaying = !isPlaying;
});


document.addEventListener('DOMContentLoaded', () => {
    const messageButton = document.getElementById('message-button');
    const messageModal = document.getElementById('messageModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const messageForm = document.getElementById('messageForm');


    messageButton.addEventListener('click', () => {
        messageModal.style.display = 'block';
    });


    closeBtn.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });


    window.addEventListener('click', (event) => {
        if (event.target == messageModal) {
            messageModal.style.display = 'none';
        }
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value || 'Anonymous';
        const message = document.getElementById('message').value;

        console.log(name, message)

        messageModal.style.display = 'none';

        axios.post("https://formspree.io/f/xanywvbn", {
            name,
            message
        }).then(res => {

            showNotification('Message sent successfully!', 'success');
        }).catch(() => {
            showNotification("Error Try Again", "error")
        })

    });
});



function showNotification(message, type) {
    notification.textContent = message;
    notification.className = 'notification show ' + type;
    setTimeout(() => {
        notification.className = 'notification ' + type;
    }, 3000);
}




particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});