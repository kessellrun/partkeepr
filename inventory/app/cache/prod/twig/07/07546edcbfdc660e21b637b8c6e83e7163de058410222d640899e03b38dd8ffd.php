<?php

/* @Framework/Form/checkbox_widget.html.php */
class __TwigTemplate_d424ba8839bda3b62d986acd8cb2d195fbf4bb90b1c1a54d98aff892d7a7b519 extends Twig_Template
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
        $__internal_2f509739a072ef867c1453a504410a3f67c14b321429f0a169b3e5054ef8dd25 = $this->env->getExtension("native_profiler");
        $__internal_2f509739a072ef867c1453a504410a3f67c14b321429f0a169b3e5054ef8dd25->enter($__internal_2f509739a072ef867c1453a504410a3f67c14b321429f0a169b3e5054ef8dd25_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/checkbox_widget.html.php"));

        // line 1
        echo "<input type=\"checkbox\"
    <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>
    <?php if (strlen(\$value) > 0): ?> value=\"<?php echo \$view->escape(\$value) ?>\"<?php endif ?>
    <?php if (\$checked): ?> checked=\"checked\"<?php endif ?>
/>
";
        
        $__internal_2f509739a072ef867c1453a504410a3f67c14b321429f0a169b3e5054ef8dd25->leave($__internal_2f509739a072ef867c1453a504410a3f67c14b321429f0a169b3e5054ef8dd25_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/checkbox_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="checkbox"*/
/*     <?php echo $view['form']->block($form, 'widget_attributes') ?>*/
/*     <?php if (strlen($value) > 0): ?> value="<?php echo $view->escape($value) ?>"<?php endif ?>*/
/*     <?php if ($checked): ?> checked="checked"<?php endif ?>*/
/* />*/
/* */
