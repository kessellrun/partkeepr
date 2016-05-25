<?php

/* @Framework/Form/choice_widget.html.php */
class __TwigTemplate_b0062c36528f5f2cb5a1b3e6b47e9ebc5f7905ee667c47e6ee29d864cd94e212 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_cb31ae9050b0d0b5764242b4f870164471f3519ca7f4752812e4af3667a2fdc9 = $this->env->getExtension("native_profiler");
        $__internal_cb31ae9050b0d0b5764242b4f870164471f3519ca7f4752812e4af3667a2fdc9->enter($__internal_cb31ae9050b0d0b5764242b4f870164471f3519ca7f4752812e4af3667a2fdc9_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/choice_widget.html.php"));

        // line 1
        echo "<?php if (\$expanded): ?>
<?php echo \$view['form']->block(\$form, 'choice_widget_expanded') ?>
<?php else: ?>
<?php echo \$view['form']->block(\$form, 'choice_widget_collapsed') ?>
<?php endif ?>
";
        
        $__internal_cb31ae9050b0d0b5764242b4f870164471f3519ca7f4752812e4af3667a2fdc9->leave($__internal_cb31ae9050b0d0b5764242b4f870164471f3519ca7f4752812e4af3667a2fdc9_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/choice_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($expanded): ?>*/
/* <?php echo $view['form']->block($form, 'choice_widget_expanded') ?>*/
/* <?php else: ?>*/
/* <?php echo $view['form']->block($form, 'choice_widget_collapsed') ?>*/
/* <?php endif ?>*/
/* */
